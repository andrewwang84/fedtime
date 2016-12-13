var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shop = new Schema({
	"uid" : String,
    "uname" : String,
    "title" : String,
    "describe" : String,
    "cnum" : Number,
    "mincnum" : Number,
    "cavalnum" : Number,
    "host_t" : Number,
    "start_t" : Number,
    "end_t" : Number,
    "cost" : Number,
    "loc_city" : String,
    "loc" : String,
    "tags" : [String],
    "phone" : String,
    "customerid" : Array,
    "s_else" : String,
    "s_pic" : Array,
    "final" : String
}, {
    versionKey: false
});

module.exports = mongoose.model('shop', shop);