var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var u = new Schema({
	"id" : String,
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

// methods ======================
// generating a hash
u.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
u.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('u', u);