var express = require('express');
var router = express.Router();
const axios = require('axios')
const helpers = require('../helpers');
require('dotenv').config();

router.get('/', helpers.getLocation, (req, res, next) => {
    axios.get(`https://api.darksky.net/forecast/${process.env.DKEY}/${res.locals.latitude},${res.locals.longitude}`)
        .then((gRes) => {
            res.render('index', {
                current: gRes.data.currently,
                hourly: gRes.data.hourly,
                daily: gRes.data.daily
            })
        }).catch((err) => { console.log(err) })
});

router.post('/search', (req, res, next) => {
    gAddress = req.body.address.replace(/\s/g, '+')
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${gAddress}&key=${process.env.GKEY}`)
        .then((gRes) => {
            req.session.latitude = gRes.data.results[0].geometry.location.lat
            req.session.longitude = gRes.data.results[0].geometry.location.lng
            console.log(`eeeeeeeee ${req.session.latitude}`)
        }).catch((err) => { console.log(err) })
    return next()
}, (req, res, next) => {
    console.log(`ffffffff ${req.session.latitude}`)
    axios.get(`https://api.darksky.net/forecast/${process.env.DKEY}/${req.session.latitude},${req.session.longitude}`)
        .then((gRes) => {
            res.redirect('index')
        }).catch((err) => { console.log(err) })
})

module.exports = router;