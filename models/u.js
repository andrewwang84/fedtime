var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var u = new Schema({
	"_id" : String,
    "token" : String,
    "email": String,
	"name" : String,
	"type" : String,
    "agree" : String,
    "rate" : Number,
    "foodrate" : Number,
    "placerate" : Number,
    "sex" : String,
    "shop_suc" : Number,
    "shop_fail" : Number,
    "shop_mean_nocook" : Number,
    "shop_mean_noeat" : Number,
    "follower" : Number,
    "telant" : String,
    "words" : String,
    "img" : String
}, {
    versionKey: false
});

module.exports = mongoose.model('u', u);