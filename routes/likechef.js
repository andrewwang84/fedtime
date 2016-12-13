var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Likechef = require('../models/likechef.js');

//Get
router.get('/', function(req, res, next) {
  Likechef.find(function (err, likechef) {
    if (err) return next(err);
    res.json(likechef);
  });
});
router.get('/:id', function(req, res, next) {
  Likechef.findOne({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Post
router.post('/', function(req, res, next) {
  Likechef.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Patch
router.patch('/:id', function(req, res, next) {
  Likechef.findByIdAndUpdate(req.params.id, { $push: req.body } , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Delete
router.delete('/:id', function(req, res, next) {
  Likechef.findByIdAndUpdate(req.params.id, { $pull: req.body } , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;