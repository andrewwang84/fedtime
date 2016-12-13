var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meannocook = new Schema({
	"uid" : String,
	"shopid" : String
}, {
    versionKey: false
});

module.exports = mongoose.model('meannocook', meannocook);