const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
    // username: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // }
})

// adds on to our schema a username and a field for password! As well as additional methods
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users2', UserSchema)