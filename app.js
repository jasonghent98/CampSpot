if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');
const app = express();
// The path module provides utilities for working with file and directory paths.
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const methodOverride = require('method-override');
const catchAsync = require('./utils/catchAsync');
const err = require('./utils/Express.Errors');
const {campgroundSchema, review, reviewSchema} = require('./schemas');
const ExpressError = require('./utils/Express.Errors');
const Campground = require('./models/campground');
const Review = require('./models/review');
const User = require('./models/user');

// our routes
const campgroundRoutes = require('./routes/campgroundRoutes')
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes')

// What do these do?!?!?!
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
// provides different stratgies for authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');



const reviews = require('./routes/reviewRoutes')


// middleware to set req.body to user input value, instead of 'undefined' for POST REQ.
app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

// DFINE SESSION FIRST, COOKIE-PARSER MIDDLEWARE THEN CALL FLASH IN ORDER TO USE BOTH OF THEM INTO YOUR ROUTES. 

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(cookieParser('secret'));
app.use(session(sessionConfig));



// initialize passport module
app.use(passport.initialize());
app.use(passport.session());
// specify the strategy we would like to use 
passport.use(new LocalStrategy(User.authenticate()));

// serializes users into the session
passport.serializeUser(User.serializeUser());
// deserializes users into the session
passport.deserializeUser(User.deserializeUser());

app.use(flash());
// Middleware allows you to set up a value under 'success' and have access to it in all your routes without 
// having to pass it through
app.use((req, res, next) => {
    // console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes)
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);


app.use(express.static(path.join(__dirname, 'public')));



const validateCampground = (req, res, next) => {
    const {error} = CampgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


// Connect your app to the database
mongoose.connect('mongodb://localhost:27017/yelp-camp', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('DB connected!')
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('homePage')
})

// app.get('/makecampground', async (req, res) => {
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

// app.get('/campgrounds', catchAsync(async (req, res) => {
//     const campgrounds = await Campground.find({});
//     res.render('campgrounds/index', {campgrounds});
// }));

// app.get('/campgrounds/new', (req, res) => {
//     res.render('campgrounds/new');
//     // create a new instance of a review
// })

// app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
//   const camp = new campground(req.body.campground)
//   await camp.save();
//   console.log(req.body.campground)
//   res.redirect(`/campgrounds/${camp._id}`)
// }));

// app.get('/campgrounds/:id', catchAsync(async (req, res) => {
//     const camp = await Campground.findById(req.params.id).populate('reviews')
//     res.render('campgrounds/show', {camp});

// }));

// app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
//     const camp = await campground.findById(req.params.id)
//     res.render('campgrounds/edit', {camp});
// }));

// app.patch('/campgrounds/:id', catchAsync(async (req, res) => {
//     const {id} = req.params;
//     const update = await campground.findByIdAndUpdate(id, {...req.body.campground}, {new: true});
//     console.log(req.body.campground);
//     await update.save();
//     res.redirect(`/campgrounds/${update._id}`);
// }));

// // Delete a campground

// app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
//     const {id} = req.params;
//     const remove = await Campground.findByIdAndDelete(id)
//     res.redirect('/campgrounds');
// }));

// app.all('*', (req, res, next) => {
//     next(new Error('something went wrong', 500));
// })

app.use((err, req, res, next) => {
    const {message = 'oops', status = 500} = err
    if (!err.message) {err.message = 'Oh no, something went wrong'};
    res.status(status).render('error', {err});
})

app.listen(3000, () => {
    console.log('Serving Port 3000')
})


