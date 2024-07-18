const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// index router
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            pantry:currentUser.pantry,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }   
  });

// new router
router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
  });

// create router
router.post('/', async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

// edit router
router.get('/:itemId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const foodItem = currentUser.pantry.id(req.params.itemId);
        res.render('foods/edit.ejs', {
            foodItem:foodItem,
        });
    }catch(error) {
        console.log(error);
        res.redirect('/')
    }
});

// update router
router.put('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const foodItem = currentUser.pantry.id(req.params.itemId);
        foodItem.set(req.body);
        await currentUser.save();
        res.redirect(
           `/users/${currentUser._id}/foods` 
        );
    }catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

// delete route
router.delete('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.itemId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    }catch (error) {
        console.log(error);
        res.redirect('/')
    }
})
module.exports = router;