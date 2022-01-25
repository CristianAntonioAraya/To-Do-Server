const { Schema , model } = require('mongoose');
 
const userSchema = Schema({
    userName: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = model('User', userSchema)