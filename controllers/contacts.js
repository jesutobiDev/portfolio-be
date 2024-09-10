const nodemailer = require("nodemailer");
const Contact = require('../models/contacts.js');
require('dotenv').config();

// Handle contact form submission
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validations
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required fields' });
    }

    // Create a new contact instance and save it to the database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.OUTLOOK_USER,
        pass: process.env.OUTLOOK_PASS,
      },
    });


    // Define email options
    const mailOptions = {
      from: process.env.OUTLOOK_USER, // Use your Outlook email
      replyTo: email, // User's email for replies
      to: process.env.OUTLOOK_USER, // Send email to yourself
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from your website's contact form:

      Name: ${name}
      Email: ${email}
      Message: ${message}`,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return res.status(500).json({ message: 'Error sending email, but form was saved' });
    }

    // Respond with success message
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
