const BookUsers = require('../model/bookUserModel');
const {generateToken} = require('../helpers/userHelper')
const express = require("express");
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');


const signUser = async (req, res) => {
    const { username, email, password} = req.body
    //destructuring the object and creating an instance of the object which is saved in the variable newUser
    try {
        const newUser = new BookUsers({
            username,
            email,
            password  

        })

        //after the user input the correct credentials, the credentials are now saved in to the database

        const user = await newUser.save();
        //immediately it get saved into the database a token is generated for the user that user(using te database id)
        const token = generateToken(user._id)
        //the generated token is now used to set a cookie for the user, this cookie
        res.cookie("jwt", token, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true});
        //expiration time is set for the cookie when the user signs up after some days
        res.status(201).json( { user: user })
        //res.status when the response is successful

    } catch (error) {
        console.log(error.message)
        res.json( { error });
        
    }
}

//after a user signs up he/she doesn't need to sign up again since his/her credentials are now saved into the database and a special
//database id 
//now if a user is coming to log in he has to put in the correct credentials used when signing up
//using the email which is unique, the databse model.finOne method searches the databse to find this users email
const loginUser = async (req, res) => {
    const{ email, password } = req.body;

    try {
        const user = await BookUsers.findOne({email})
        //after the email is found in the databse
        if(user) {
            const isSame = await bcrypt.compare(password, user.password);
            //it is now compared with the users  password if it is the same a new token is again generated for the user
           //the generated token is then uses to set the cookies
           //httpOnly is
          //if the users password is wrong an error message is sent to him
          //if the email is also wrong a res.json messgae is sent to him in the frontend that the email doesnt exist
            if(isSame) {
                const token = generateToken(user._id);
                res.cookie("jwt", token, { maxAge: 3 * 24 * 60* 60 * 1000, httpOnly: true })
                res.status(200).json({user: user._id})
            } else {
                res.json({ errors: "wrong password"})
            }
        } else {
            res.json({ errors: "email or password doesnt exist"})
        }
        
    } catch (error) {
        console.log(error)
        
    }


}




module.exports = {
    signUser,
    loginUser
}