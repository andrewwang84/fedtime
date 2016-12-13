var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Meannoeat = require('../models/meannoeat.js');

//Get
router.get('/', function(req, res, next) {
  Meannoeat.find(function (err, meannoeat) {
    if (err) return next(err);
    res.json(meannoeat);
  });
});
router.get('/:id', function(req, res, next) {
  Meannoeat.findOne({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.get('/s/:id', function(req, res, next) {
  Meannoeat.find({shopid:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Post
router.post('/', function(req, res, next) {
  Meannoeat.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Patch
router.patch('/:id', function(req, res, next) {
  Meannoeat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Delete
router.delete('/:id', function(req, res, next) {
  Meannoeat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;