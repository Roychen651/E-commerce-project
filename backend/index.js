// © Roy Chen & Omer Sruia 2024

const port = 4000;
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

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
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    },
});

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
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

// Creating API for getting all products
app.get('/getproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});

// Creating User Schema for user model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// Creating Endpoint for user registration
app.post('/register', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            errors: "אימייל כבר קיים במערכת"
        });
    }

    let cart = {};
    for (let i = 0; i < 350; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id,
            username: user.name
        }
    };

    const authToken = jwt.sign(data, 'secret_ecom');
    res.json({
        success: true,
        authToken,
        username: user.name
    });
});

// Creating Endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const pass_compare = req.body.password === user.password;
        if (pass_compare) {
            const data = {
                user: {
                    id: user.id,
                    username: user.name
                }
            };
            const authToken = jwt.sign(data, 'secret_ecom');
            res.json({
                success: true,
                authToken,
                username: user.name
            });
        } else {
            res.json({
                success: false,
                errors: "הסיסמא שהוקשה שגויה"
            });
        }
    } else {
        res.json({
            success: false,
            errors: "האימייל שהוקש שגוי"
        });
    }
});

// Creats the Endpoint for the new collection section fetching from my mongoDB
app.get('/newcollections', async (req, res) => {
    console.log('Fetching new collections');
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection);
});

// Creates the Endpoint for the women Hot Collection
app.get('/popularinwomen', async (req, res) => {
    console.log('Fetching popular collections');
    let products = await Product.find({category:"women"})
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women Fetched");
    res.send(popular_in_women);
});

// Enpoint for related product fetching
app.get('/relatedproducts/:category', async (req, res) => {
    const { category } = req.params;
    try {
      let products = await Product.find({ category });
      let relatedProducts = products.slice(0, 4); // Adjust this to fetch the correct number of related products
      res.send(relatedProducts);
    } catch (error) {
      console.error('Error fetching related products:', error);
      res.status(500).send({ error: 'Failed to fetch related products' });
    }
  });
  

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587,
  auth: {
    user: 'omersr9@gmail.com',  // your mail
    pass: 'nqvf tpcl rmen ielw'  // your app password of gmail
  }
});

// Endpoint for sending receipt
app.post('/send-receipt', async (req, res) => {
  const { email, items, totalAmount } = req.body;

  // Create the email content
  const mailOptions = {
    from: 'O&B@gmail.com', 
    to: email,
    subject: 'קבלה עבור הרכישה שלך',
    html: `
      <h1>תודה על הרכישה!</h1>
      <h2>פרטי הקבלה:</h2>
      <table>
        <tr>
          <th>מוצר</th>
          <th>מידה</th>
          <th>מחיר</th>
          <th>כמות</th>
          <th>סך הכל</th>
        </tr>
        ${items.map(item => `
          <tr>
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>₪${item.price}</td>
            <td>${item.quantity}</td>
            <td>₪${item.total}</td>
          </tr>
        `).join('')}
      </table>
      <h3>סכום כולל: ₪${totalAmount}</h3>
    `
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'הקבלה נשלחה בהצלחה' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'שליחת הקבלה נכשלה' });
  }
});



// Creating API for updating products
app.post('/updateproduct', async (req, res) => {
    const { id, name, image, category, new_price, old_price } = req.body;
  
    try {
      const product = await Product.findOneAndUpdate(
        { id: id },
        { name, image, category, new_price, old_price },
        { new: true }
      );
  
      if (product) {
        console.log("Product Updated");
        res.json({
          success: true,
          product: product
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update product'
      });
    }
  });

  // Creating API for updating products
app.post('/updateproduct', async (req, res) => {
    const { id, name, image, category, new_price, old_price } = req.body;
  
    try {
      const product = await Product.findOneAndUpdate(
        { id: id },
        { name, image, category, new_price, old_price },
        { new: true }
      );
  
      if (product) {
        console.log("Product Updated");
        res.json({
          success: true,
          product: product
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update product'
      });
    }
  });
  

// Endpoint for sending newsletter subscription confirmation
app.post('/subscribe', async (req, res) => {
    const { email } = req.body;

 
    const mailOptions = {
        from: 'O&B@gmail.com',
        to: email,
        subject: 'תודה על ההצטרפות לניוזלטר',
        html: `
            <h1>תודה על ההצטרפות!</h1>
            <p>נשמח לעדכן אותך במבצעים והחדשות החמות ביותר.</p>
        `
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'האימייל נשלח בהצלחה' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'שליחת האימייל נכשלה' });
    }
});

app.listen(port, (error) => {
    if (error) {
        console.log("Error in server setup" + error);
    }
    console.log("Server is running on port", port);
});




// © Roy Chen & Omer Sruia 2024