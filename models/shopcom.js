var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shopcom = new Schema({
	"_id" : String,
	"com" : Array
}, {
    versionKey: false
});

module.exports = mongoose.model('shopcom', shopcom);