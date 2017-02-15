var express = require('express');
var router = express.Router();
const axios = require('axios')
const helpers = require('../helpers');
require('dotenv').config();

router.get('/', helpers.getLocation, (req, res, next) => {
    let latitude = req.session.latitude | res.locals.latitude
    let longitude = req.session.longitude | res.locals.longitude
    axios.get(`https://api.darksky.net/forecast/${process.env.DKEY}/${latitude},${longitude}`)
        .then((gRes) => {
            res.render('index', {
                current: gRes.data.currently,
                hourly: gRes.data.hourly,
                daily: gRes.data.daily
            })
        }).catch((err) => { console.log(err) })
});
router.post('/search', helpers.getAddLocation, (req, res, next) => {
    res.redirect('/')
        .catch((err) => { console.log(err) })
})

module.exports = router;