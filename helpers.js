const axios = require('axios');
require('dotenv').config();

function getLocation(req, res, next) {
    res.locals.latitude = '37.8267'
    res.locals.longitude = '-122.4233'
        // axios.get(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GKEY}`)
        //     .then((gRes) => {
        //         console.log(`google response: ${gRes}`)
        //         res.locals.latitude = gRes.data.location.lat
        //         res.locals.longitude = gRes.data.location.lng
        //     }).catch((err) => {
        //         res.locals.latitude = '37.8267'
        //         res.locals.longitude = '-122.4233'
        //     })
    return next()
}

function getAddLocation(req, res, next) {
    gAddress = req.body.address.replace(/\s/g, '+')
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${gAddress}&key=${process.env.GKEY}`)
        .then((gRes) => {
            setTimeout(() => {
                req.session.latitude = gRes.data.results[0].geometry.location.lat
                req.session.longitude = gRes.data.results[0].geometry.location.lng
                console.log(`eeeeeeeee ${req.session.latitude}`)
            }, 3000)
        }).catch((err) => { console.log(err) })
    return next()
}

module.exports = { getLocation, getAddLocation };