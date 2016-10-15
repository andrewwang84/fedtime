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
    "sex" : String,
    "shop_suc" : Number,
    "shop_fail" : Number
}, {
    versionKey: false
});

module.exports = mongoose.model('u', u);