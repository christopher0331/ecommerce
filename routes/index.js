const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
    res.render('home', {
        title: 'Welcome to Our E-commerce Store'
    });
});

module.exports = router;
