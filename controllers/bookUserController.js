const BookUsers = require('../model/bookUserModel');
const {generateToken} = require('../helpers/userHelper')
const express = require("express");
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');


const signUser = async (req, res) => {
    const { username, email, password} = req.body
    try {
        const newUser = new BookUsers({
            username,
            email,
            password
            

        })

        const user = await newUser.save();

        const token = generateToken(user._id)
        res.cookie("jwt", token, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true});
        res.status(201).json( { user: user })

    } catch (error) {
        console.log(error.message)
        res.json( { error });
        
    }
}

const loginUser = async (req, res) => {
    const{ email, password } = req.body;
    try {
        const user = await BookUsers.findOne({email})
        if(user) {
            const isSame = await bcrypt.compare(password, user.password);

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