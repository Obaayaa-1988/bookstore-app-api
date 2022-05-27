const mongoose = require('mongoose');

const { Schema} = mongoose;

const BookSchema = new Schema ({
    number: { 
        type: String,
        required: true
    },

    username: { 
        type: String,
        required: true
    },
    author: { 
        type: String,
        required: true
    },
    
    title: { 
        type: String,
        required: true
    },
    price: { 
        type: Number,
        required: true
    },

    description: { 
        type: String,
        required: true
    },

    bookImg:{
        type: String
    }


}, {timestamps: true});

const Books = mongoose.model("Books", BookSchema);

module.exports = Books;
