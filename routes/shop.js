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
  Shop.findById(req.params.id, function (err, post) {
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
//Put
router.put('/:id', function(req, res, next) {
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