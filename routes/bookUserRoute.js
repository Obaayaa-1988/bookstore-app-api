const express = require("express");
const bcrypt= require("bcrypt");
const router = express.Router();

const{
    signUser,
    loginUser

} = require("../controllers/bookUserController")

router.post("/api/sign-up", signUser)
router.get("api/log-in", loginUser)

//routes for signing up

module.exports = router