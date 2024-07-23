# E-Commerce Platform

Welcome to the **E-Commerce Platform** repository! 
This project is a fully-functional e-commerce website built with the MERN stack (MongoDB, Express.js, React.js, Node.js).
The platform allows users to browse and purchase products, manage their shopping cart, register and login, and receive newsletters.

## 🌟 Features

- **User Authentication**: Secure registration and login system with JWT authentication.
- **Product Management**: Add, delete, and display products with an admin panel.
- **Shopping Cart**: Add to cart, remove from cart, and view total amount.
- **Newsletter Subscription**: Subscribe to newsletters and receive email updates.
- **Responsive Design**: Optimized for all devices, from desktops to mobile phones.
- **Dynamic Collections**: Fetch and display new and popular products dynamically.

## 📸 Screenshots

![Homepage](./screenshots/homepage.png)
![Product Page](./screenshots/product_page.png)
![Cart](./screenshots/cart.png)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Roychen651/E-commerce-project.git
    cd e-commerce-platform
    ```

2. **Install server dependencies:**

    ```bash
    cd backend
    npm install
    ```

3. **Install client dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

### Setup

1. **Configure environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/e-commerce
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password
    ```

2. **Start the server:**

    ```bash
    cd backend
    npm start
    ```

3. **Start the client:**

    ```bash
    cd ../frontend
    npm start
    ```

### Usage

- Navigate to `http://localhost:3000` to view the application.
- Use the admin panel to add products.
- Register a new account and start shopping!

## 🛠️ Built With

- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Backend Framework
- [React.js](https://reactjs.org/) - Frontend Library
- [Node.js](https://nodejs.org/) - Server Environment
- [NodeMailer](https://nodemailer.com/about/) - Email Handling

## 📬 Newsletter Subscription

To subscribe to our newsletter, simply enter your email address in the subscription form on the homepage and click "Subscribe". You will receive the latest updates and offers directly to your inbox.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## ✨ Acknowledgments

- Special thanks to all the contributors who helped in the development of this project.
- Inspiration from various open-source projects.

## 📧 Contact

Feel free to reach out if you have any questions or suggestions:


---

<p align="center">
    Made with ❤️ by Roy And Omer
</p>
