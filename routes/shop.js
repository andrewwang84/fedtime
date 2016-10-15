var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Shop = require('../models/shop.js');

//Get
router.get('/', function(req, res, next) {
  Shop.find(function (err, shop) {
    if (err) return next(err);
    res.json(shop);
  });
});
router.get('/:id', function(req, res, next) {
  Shop.findOne({uid:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.get('/u/:id', function(req, res, next) {
  Shop.findOne({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Post
router.post('/', function(req, res, next) {
  Shop.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Patch
router.patch('/:id', function(req, res, next) {
  Shop.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Delete
router.delete('/:id', function(req, res, next) {
  Shop.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;