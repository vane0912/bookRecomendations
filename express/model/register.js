const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Email:{
        type: String,
        unique: true,
        required: true
    },
    Password:{
        type: String,
        requiered: true
    }
})
const register = mongoose.model('register', userSchema)
module.exports = register;