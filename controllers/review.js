const Campground = require('../models/campground');
const Review = require('../models/review');


module.exports.createReview = async (req, res) => {
    // search under the campground collection and find the specific campground with the id provided in req.params
    const camp = await Campground.findById(req.params.id)
    // create a new review object and fill it with user input
    const review = new Review(req.body.review)
    review.author = req.user._id;
    // push the value of the review field onto the campground object
    camp.reviews.push(review);
    // assign the author of the review to the currentUser
    // save the review object to DB
    await review.save();
    // save the campground object to DB
    await camp.save();
    req.flash('success', 'Created new review!')
    res.redirect(`/campgrounds/${camp._id}`);
}

module.exports.deleteReview = async(req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`)
}