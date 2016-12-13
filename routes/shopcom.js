var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Shopcom = require('../models/shopcom.js');

//Get
router.get('/', function(req, res, next) {
  Shopcom.find(function (err, shopcom) {
    if (err) return next(err);
    res.json(shopcom);
  });
});
router.get('/:id', function(req, res, next) {
  Shopcom.findOne({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Post
router.post('/', function(req, res, next) {
  Shopcom.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Patch
router.patch('/:id', function(req, res, next) {
  Shopcom.findByIdAndUpdate(req.params.id, { $push: req.body } , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Delete
router.delete('/:id', function(req, res, next) {
  Shopcom.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;