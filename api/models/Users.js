
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	},

	emailId: {
		type: String,
        required: true
	},

    contactNo: {
        type: String,
        required: true
    },

	password:{
		type:String,
		required: true
	},
	
	cretaedAt:{
		type: Date,
		default: Date.now
	}

});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, callback) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model("Users", UserSchema);