const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

//TODO: get list of ninjas nearby

router.get('/getAllNinjas', (req, res) => {
    Ninja.find({}).then((n) => { res.send(n) });
});

router.get('/ninjas', function (req, res, next) {

    console.log(req.query.lat+" "+req.query.lng);
    
    var lat = parseFloat(req.query.lng);
    var lng = parseFloat(req.query.lat);

    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    Ninja.aggregate([
        {
            $geoNear: {
                /* near: 'Point', */
                near: point,
                distanceField: "dis",
                maxDistance: 100000,
                spherical: true,
            }
        }
    ]).then(function () {
        res.send();
    }).catch(next);


});

// Ninja.geoNear({
//     type: 'Point',
//     coordinates: [
//         parseFloat(req.query.lng),
//         parseFloat(req.query.lat)
//     ]
// },
//     {
//         maxDistance: 1000,
//         spherical: true
//     }).then(function (n) {
//         res.send(n);
//     });
// //new
router.post('/ninjas', function (req, res, next) {
    Ninja.create(req.body).then(function (ninja) {
        res.send(ninja);
    }).catch(next);


});

//update
router.put('/ninjas/:id', function (req, res, next) {
    var reqId = req.params.id;
    Ninja.findByIdAndUpdate({ _id: reqId }, req.body).then(function () {
        Ninja.findOne({ _id: reqId }).then(function (n) {
            res.send(n);
        })
    }).catch(next);

});

router.delete('/ninjas/:id', function (req, res, next) {
    var reqId = req.params.id;
    Ninja.findByIdAndRemove({ _id: reqId }).then(function (n) {
        res.send(n);
    }).catch(next);

});


module.exports = router;
