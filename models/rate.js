var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rate = new Schema({
	"_id" : String,
    "rnum" : Number,
    "rcontent" : String
}, {
    versionKey: false
});

module.exports = mongoose.model('rate', rate);