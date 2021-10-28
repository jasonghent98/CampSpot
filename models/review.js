const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: [
        {
        type: Schema.Types.ObjectId,
        ref: 'users2'
    }
    ]
});

const review = mongoose.model('review', reviewSchema);
module.exports = review;