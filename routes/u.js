var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var U = require('../models/u.js');

//Get
router.get('/', function(req, res, next) {
  U.find(function (err, u) {
    if (err) return next(err);
    res.json(u);
  });
});
router.get('/:id', function(req, res, next) {
  U.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Post
router.post('/', function(req, res, next) {
  U.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Patch
router.patch('/:id', function(req, res, next) {
  U.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//Delete
router.delete('/:id', function(req, res, next) {
  U.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;