const express = require('express');
const BooksModel = require("../model/bookModel");
const multer = require('multer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


//a user adding a book, this backend model must correspond to the frontend(form) that the user will be input his/her details
//req.body to access data in json format from the client side
const addNewBook = async (req, res) =>{
    // const {username, author, title, price, description} = req.body;
        const bookUser = {
            username: req.body.username,
            author: req.body.author,
            title: req.body.title,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            bookImg: req.file.originalname
        };

        //

        const bookToSave =  await new BooksModel(bookUser)
        //new keyword creatng a instance of the object bookUser and saving it in the variable bookToSave
        //.save() saving the  users details in the database(variable bookSave)
        //response.send for testing
        bookToSave.save().then(results => {
            if(results) res.send(results)
        }).catch (err => {
            console.log(err)
        })

}


//now the users input from the frontend thanks to the backend database model has been saved in the databse now it is time
//to display it to the user when they request
//fetching all books from the database
//BoosModel the variable represeting the databse now we use the mongodb find() to find and fetch all data from the databse
const getAllBooks = (req, res) => {
    BooksModel.find().then(results => {
        res.send(results)
    }).catch(err => {
        console.log(err.message)
    })

}
//now if we want to find and display just a single book(data) from the database we use the mongodb findById() method to fetch it
//req.params 
//fetching a single book from the database
const getOneBook = (req, res) => {
    BooksModel.findById(req.params.id).then( result => {
        if(result) {
            res.send(result)
        }
    }).catch(err => console.log(err))

}

//a user deleting a book he/she added
//this is the crud operation for a user to delete he/she added also using the mongodb find
//this will also be connected to the frontend it could be a button click etc

const deleteBook = (req, res) => {
    BooksModel.findByIdAndDelete(req.params.id).then( result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}

//a user updating a book he/she updated
//this is for a user to update details of a book he/she 
//for it to be doable we use the req.body and req.params for the user to make the changes based on the users id(databse id) of
//that data saved
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
