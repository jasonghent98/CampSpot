const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Review = require('../models/review');
const {reviewSchema} = require('../schemas');
const reviewController = require('../controllers/review')
const {isLoggedIn, validateCampground, isAuthor, isReviewAuthor, validateReview} = require('../middleware')

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/Express.Errors');


// Post a new review to campsite

router.post('/', isLoggedIn, validateReview, catchAsync(reviewController.createReview)); 

// Delete a review
router.delete('/:reviewId', isReviewAuthor, isLoggedIn, catchAsync(reviewController.deleteReview))
// app.use('/campgrounds/:id/reviews', reviewRoutes)
module.exports = router;