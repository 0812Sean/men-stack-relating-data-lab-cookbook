const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', (req, res) => {
    res.render('foods/index.ejs')
  });

// new router
router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
  });
module.exports = router;