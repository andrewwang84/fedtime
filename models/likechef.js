var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likechef = new Schema({
	"_id" : String,
	"chefid" : Array
}, {
    versionKey: false
});

module.exports = mongoose.model('likechef', likechef);