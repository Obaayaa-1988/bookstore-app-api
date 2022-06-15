const express = require('express');
const multer = require("multer")

const router = express.Router();

const {
    addNewBook,
    getAllBooks,
    getOneBook,
    deleteBook,
    updateBook

} = require('../controllers/bookController')

// router.post('/api/books', addNewBook)
router.get('/api/all-books', getAllBooks)
router.get('/api/book/:id', getOneBook)
router.delete('/api/delete-book/:id', deleteBook)
router.put('/api/book/:id', updateBook)




//uploading the book image to the database
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'public/uploads')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = file.originalname
        cb(null, file.fieldname + uniqueSuffix)
        console.log(uniqueSuffix)


    },

})

const upload = multer({storage})

router.post('/api/books',upload.single('bookImg'), addNewBook )






module.exports = router;