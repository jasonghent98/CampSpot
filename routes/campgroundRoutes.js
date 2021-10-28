// const express = require('express');
// const router = express.Router();
// const catchAsync = require('../utils/catchAsync');
// const Campground = require('../models/campground');
// const Review = require('../models/review');
// const middleware = require('../middleware');
// const methodOverride = require('method-override');
// // Middleware
// router.use(express.urlencoded({extended: true}));

// // REQUESTS
// router.get('/', catchAsync(async (req, res) => {
//     const campgrounds = await Campground.find({});
//     res.render('campgrounds/index', {campgrounds});
//     console.log('route hit')
// }));

// router.get('/makecampground', async (req, res) => {
//     try {
//         const camp = new campground({
//             title: 'My Backyard',
//             description: 'cheap campground'
//         })
//         await camp.save();
//         res.send(camp);
        
//     } catch (error) {
//         console.log(error.message)
//     }
// })

// router.get('/new', middleware.isLoggedIn, (req, res) => {
//     res.render('campgrounds/new');
// })

// router.post('/', middleware.isLoggedIn, middleware.validateCampground, catchAsync(async (req, res, next) => {
//   const camp = new Campground(req.body.campground)
//   camp.author = req.user._id;
//   await camp.save();
//   req.flash('success', 'Successfully made a new campground!');
//   res.redirect(`/campgrounds/${camp._id}`)
// }));

// // router.get('/:id', middleware.isLoggedIn, catchAsync(async (req, res) => {
// //     const camp = await Campground.findById(req.params.id).populate('reviews').populate({path: 'author', model: 'users2'});
// //     console.log(camp);
// //     if (!camp) {
// //         req.flash('error', 'Cannot find that campground!')
// //         console.log('i am retarded')
// //         return res.redirect('/campgrounds');
// //     }
// //     res.render('campgrounds/show', {camp});
// // }));

// router.get('/:id', catchAsync(async (req, res,) => {
//     const camp = await Campground.findById(req.params.id).populate({
//         path: 'reviews',
//         populate: {
//             path: 'author'
//         }
//     }).populate('author');
//     console.log(camp);
//     if (!camp) {
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/campgrounds');
//     }
//     res.render('campgrounds/show', { camp });
// }));


// router.get('/:id/edit', middleware.isLoggedIn, middleware.isAuthor, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const campground = await Campground.findById(id)
//     if (!campground) {
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/campgrounds');
//     }
//     res.render('campgrounds/edit', { campground });
// }))

// router.patch('/:id', middleware.isAuthor, catchAsync(async (req, res) => {
//     const {id} = req.params;
//     const campground = await Campground.findById(id);
//     if (!(campground.author == req.user._id)) {
//         req.flash('error', 'You do not have permission to do that!')
//         res.redirect(`/campgrounds/${campground._id}`)
//     } else {
//         const update = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new: true});
//         await update.save();
//         req.flash('success', 'Successfully updated campground!')
//         res.redirect(`/campgrounds/${update._id}`);
//     }
// }));

// // let a user create a review
// router.post('/campgrounds/:id/reviews', middleware.validateReview, catchAsync(async (req, res) => {
//     // search under the campground collection and find the specific campground with the id provided in req.params
//     const camp = await Campground.findById(req.params.id)
//     // create a new review object and fill it with user input
//     const review = new Review(req.body);
//     // push the value of the review field onto the campground object
//     // camp.reviews.push(review);
//     // // save the review object to DB
//     // await review.save();
//     // // save the campground object to DB
//     // await camp.save();
//     res.redirect(`/campgrounds/${camp._id}`);
// }));

// // Delete a review
// router.delete('/campgrounds/:id/reviews/:reviewid', catchAsync(async(req, res) => {
//     const {id, reviewid} = req.params;
//     await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewid}});
//     await Review.findByIdAndDelete(reviewid)
//     res.redirect(`/campgrounds/${id}`)
// }))

// router.delete('/:id', middleware.isLoggedIn, middleware.isAuthor, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Campground.findByIdAndDelete(id);
//     req.flash('success', "successfully deleted campground!")
// }));

// module.exports = router;

const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const Campground = require('../models/campground');
const campgroundController = require('../controllers/campground')
const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
.get(catchAsync(campgroundController.index))
.post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgroundController.createCampground))
// .post(isLoggedIn, upload.array('image'), (req, res) => {
//     console.log(req.files, req.body)
// })
 
// router.get('/', catchAsync(campgroundController.index));

router.get('/new', isLoggedIn, campgroundController.renderNewForm)


// router.post('/', isLoggedIn, validateCampground, catchAsync(campgroundController.createCampground))

router.get('/:id', catchAsync(campgroundController.showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundController.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgroundController.editCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgroundController.deleteCampground));

module.exports = router;