var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rate = new Schema({
	"_id" : String,
	"shopid" : String,
	"chefid" : String,
    "overall" : Number,
    "place" : Number,
    "food" : Number,
    "rcontent" : String
}, {
    versionKey: false
});

module.exports = mongoose.model('rate', rate);