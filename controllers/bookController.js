const express = require('express');
const BooksModel = require("../model/bookModel");
const multer = require('multer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


//a user adding a book

const addNewBook = async (req, res) =>{
    // const {username, author, title, price, description, bookImg } = req.body;
    
        const bookUser = {
            username: req.body.username,
            author: req.body.author,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            bookImg: req.file.originalname
        };

        const bookToSave = new BooksModel(bookUser)
        bookToSave.save().then(results => {
            if(results) res.send(results)
        }).catch (err => {
            console.log(err)
        })

}

//fetching all books from the database

const getAllBooks = (req, res) => {
    BooksModel.find().then(results => {
        res.send(results)
    }).catch(err => {
        console.log(err.message)
    })

}

//fetching a single book from the database
const getOneBook = (req, res) => {
    BooksModel.findById(req.params.id).then( result => {
        if(result) {
            res.send(result)
        }
    }).catch(err => console.log(err))

}

//a user deleting a book he/she added

const deleteBook = (req, res) => {
    BooksModel.findByIdAndDelete(req.params.id).then( result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}

//a user updating a book he/she updated
const updateBook = (req, res) => {
    const { author, title, price, description } = req.body;
    const bookUser = {
        author,
        title,
        price,
        description
    };

    BooksModel.updateOne({_id: req.params.id}, bookUser)
    .then((results) => {
        res.send(results)
    }).catch((err) => {
        console.log({ message: "book updated successfully"})
    })

    
}





module.exports = {
    addNewBook,
    getAllBooks,
    getOneBook,
    deleteBook,
    updateBook

}
