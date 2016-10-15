var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Rate = require('../models/rate.js');

//Get
router.get('/', function(req, res, next) {
  Rate.find(function (err, rate) {
    if (err) return next(err);
    res.json(rate);
  });
});
router.get('/:id', function(req, res, next) {
  Rate.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Post
router.post('/', function(req, res, next) {
  Rate.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Patch
router.patch('/:id', function(req, res, next) {
  Rate.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Delete
router.delete('/:id', function(req, res, next) {
  Rate.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;