const axios = require('axios');
require('dotenv').config();

function getLocation(req, res, next) {
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GGKEY}`)
        .then((gRes) => {
            res.locals.latitude = gRes.data.location.lat
            res.locals.longitude = gRes.data.location.lng
            return next()
        }).catch((err) => {
            res.locals.latitude = '40.7411155'
            res.locals.longitude = '-73.9893962'
            return next()
        })
}

function getAddLocation(req, res, next) {
    gAddress = req.body.address.replace(/\s/g, '+')
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${gAddress}&key=${process.env.GKEY}`)
        .then((gRes) => {
            req.session.latitude = gRes.data.results[0].geometry.location.lat
            req.session.longitude = gRes.data.results[0].geometry.location.lng
            req.session.newLocation = gRes.data.results[0].address_components[2].long_name
            console.log(`${req.session.newLocation} new`)
            return next()
        }).catch((err) => { console.log(err) })

}

function getCity(req, res, next) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${res.locals.latitude},${res.locals.longitude}&key=${process.env.GKEY}`)
        .then((gRes) => {
            req.session.location = gRes.data.results[0].address_components[2].long_name
            console.log(`${req.session.location} orig`)
            return next()
        }).catch((err) => { console.log(err) })
}

module.exports = {
    getLocation,
    getAddLocation,
    getCity
};