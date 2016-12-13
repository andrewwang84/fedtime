var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meannoeat = new Schema({
	"uid" : String,
	"shopid" : String
}, {
    versionKey: false
});

module.exports = mongoose.model('meannoeat', meannoeat);