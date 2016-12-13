var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Likeshop = require('../models/likeshop.js');

//Get
router.get('/', function(req, res, next) {
  Likeshop.find(function (err, likeshop) {
    if (err) return next(err);
    res.json(likeshop);
  });
});
router.get('/:id', function(req, res, next) {
  Likeshop.findOne({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Post
router.post('/', function(req, res, next) {
  Likeshop.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Patch
router.patch('/:id', function(req, res, next) {
  Likeshop.findByIdAndUpdate(req.params.id, { $push: req.body } , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Delete
router.delete('/:id', function(req, res, next) {
  Likeshop.findByIdAndUpdate(req.params.id, { $pull: req.body } , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;