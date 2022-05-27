const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const BookRegisterSchema = new Schema ({
    username:{
        type: String,
        required: [true, "Please enter your username"]
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true

    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [5, "Please the password length must be above five"]
    },


})

BookRegisterSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

const User = mongoose.model("User", BookRegisterSchema)
module.exports = User;