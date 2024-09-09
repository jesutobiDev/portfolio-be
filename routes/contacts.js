const express = require('express');
const { createContact } = require('../controllers/contacts');

const router = express.Router();

// Route to create a new contact
router.post('/', createContact);


module.exports = router;
