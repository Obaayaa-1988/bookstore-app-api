const mongoose = require('mongoose');
const { stringify } = require('uuid');

const { Schema} = mongoose;

const BookSchema = new Schema ({
    username: String,
    authorName: String,
    bookTitle: String,
    price: String,
    description: String,
    categories: String,

}, {timestamps: true});

const Books = mongoose.model("Books", BookSchema);

module.exports = Books;