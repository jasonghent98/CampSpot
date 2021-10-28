
const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/Express.Errors');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    if (!(campground.author[0].toString() == req.user._id.toString())) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    try {
        const { id, reviewId } = req.params;
        // console.log(reviewId)
        const review = await Review.findById(reviewId);
        // console.log(req.user._id);
        // console.log(review.author[0].toString());
        if (!(review.author[0].toString() == req.user._id.toString())) {
            req.flash('error', 'You do not have permission to do that!');
            return res.redirect(`/campgrounds/${id}`);
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
