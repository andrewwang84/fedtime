var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Meannocook = require('../models/meannocook.js');

//Get
router.get('/', function(req, res, next) {
  Meannocook.find(function (err, meannocook) {
    if (err) return next(err);
    res.json(meannocook);
  });
});
router.get('/:id', function(req, res, next) {
  Meannocook.findOne({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.get('/s/:id', function(req, res, next) {
  Meannocook.find({shopid:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Post
router.post('/', function(req, res, next) {
  Meannocook.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Patch
router.patch('/:id', function(req, res, next) {
  Meannocook.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Delete
router.delete('/:id', function(req, res, next) {
  Meannocook.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;