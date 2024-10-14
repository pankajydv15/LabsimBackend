// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Allow requests from other origins (like frontend)

// POST route to handle contact form submission
app.post('/contactUs', (req, res) => {
  const { name, email, message } = req.body;

  // Step 1: Create transporter for nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail or any other email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email (from .env file)
      pass: process.env.EMAIL_PASS,  // Your email password (from .env file)
    },
  });

  // Step 2: Define email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_TO, // Receiver email
    subject: `New Contact Form Submission from ${name}`,
    text: `Message from ${name} (${email}):\n\n${message}`,
  };

  // Step 3: Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending message');
    }
    res.status(200).send('Message sent successfully');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
