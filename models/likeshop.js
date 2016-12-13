var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likeshop = new Schema({
	"_id" : String,
	"shopid" : Array
}, {
    versionKey: false
});

module.exports = mongoose.model('likeshop', likeshop);