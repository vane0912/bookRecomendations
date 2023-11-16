const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    Section:{
        type: String,
        required: true
    },
    Title:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Author:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: false
    }
})
const Books = mongoose.model('Books', booksSchema);
module.exports = Books;