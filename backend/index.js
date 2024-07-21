const port = 4000;
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const exp = require('constants');
const { log } = require('console');

app.use(express.json());
app.use(cors());

// Database connection With MongoDB
mongoose.connect("mongodb+srv://roychen651:0508815855@cluster0.b2jbnsu.mongodb.net/e-commerce");

// API Creation
app.get('/', (req, res) => {
    res.send("Express App is running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage
});

// Creating upload endpoint for images
app.use('/images', express.static(path.join(__dirname, '/upload/images')));
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// schema for product
const Product = mongoose.model('Product', {
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    new_price:{
        type: Number,
        required: true
    },
    old_price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    available:{
        type: Boolean,
        default: true
    },
});

app.post('/addproduct', async (req, res) => {

    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        
    });
    console.log(product);
    await product.save();
    console.log("Product Added");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API for deleting products

app.post('/deleteproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product Deleted");
    res.json({
        success: true,
        id: req.body.id
    });
});


app.listen(port, (error) => {
    if (error) {
        console.log("Error in server setup" + error);
    }
    console.log("Server is running on port", port);
});
