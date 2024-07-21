const port = 4000;
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const exp = require('constants');


app.use(express.json());
app.use(cors());

// Database connection With MongoDB
mongoose.connect("mongodb+srv://roychen651:0508815855@cluster0.b2jbnsu.mongodb.net/e-commerce")

// API Creation

app.get('/', (req, res) => {
    res.send("Express App is running")
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

// Creating upload endpoint for images

app.use('/images', express.static(path.join('/upload/images')))
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })})


app.listen(port, (error) => {
    if (error) {
        console.log("Error in server setup" + error)
    }
    console.log("Server is running on port", port)})

