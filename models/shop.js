var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shop = new Schema({
	"hid" : String,
    "cnum" : Number,
    "start_t" : Number,
    "end_t" : Number,
    "cost" : Number,
    "loc_city" : String,
    "loc" : String,
    "tags" : Array,
    "phone" : String,
    "customerid" : Array,
    "final" : String
}, {
    versionKey: false
});

module.exports = mongoose.model('shop', shop);