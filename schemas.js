const { object, number, string } = require('joi');
const Joi = require('joi');
const joi = require('joi');
const campground = require('./models/campground');
const review = require('./models/review');

module.exports.campgroundSchema = joi.object({ 
        campground: joi.object({
            title: joi.string().required(),
            price: joi.number().required().min(0),
            // image: joi.string().required(),
            description: joi.string().required(),
            location: joi.string().required(),
        }).required(),
        deleteImages: Joi.array()
    })
module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required(),
        body: joi.string().required()
    }).required()
});