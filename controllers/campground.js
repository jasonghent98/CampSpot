const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { response } = require('express');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken})
const cloudinary = require('../cloudinary/index')






module.exports.index = async (req, res) => {
    const camp = await Campground.find({});
    res.render('campgrounds/index', { camp })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    const camp = new Campground(req.body.campground);
    const geoData = await geocoder.forwardGeocode({
        query: camp.location,
        limit: 1
    }).send()
    camp.images = req.files.map(f => ({url: f.path, filename: f.filename }))
    camp.geometry = geoData.body.features[0].geometry;
    camp.author = req.user._id;
    await camp.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${camp._id}`)
}

module.exports.showCampground = async (req, res,) => {
    const camp = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    // console.log(camp.author[0]._id);
    if (!camp) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { camp });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id)
    if (!camp) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { camp });
}

module.exports.editCampground = async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const updateImgs = req.files.map(f => ({url: f.path, filename: f.filename }));
    camp.images.push(...updateImgs);
    await camp.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.storage.cloudinary.uploader.destroy(filename);
        } 
        await camp.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${camp._id}`)
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}


