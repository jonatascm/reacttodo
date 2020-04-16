const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();
router.use(authMiddleware);

//List
router.get('/getAll', async (req, res) => {
  try{
    const users = await User.find();

    return res.send({users});
  }catch (err) {
    return res.status(400).send({error: 'Error loading Users'});
  }
});

//Show
router.get('/:UserId', async (req, res) => {
  try{
    const user = await User.findById(req.params.UserId);

    return res.send({user});
  }catch (err) {
    return res.status(400).send({error: 'Error loading User'});
  }
});

//Delete
router.delete('/', async (req, res) => {
  try{
    const user = await User.findByIdAndRemove(req.userId);

    return res.send({});
  }catch (err) {
    return res.status(400).send({error: 'Error deleting User'});
  }
});

//Update Profile
router.post('/profile', async (req, res) => {
  try{

    const {name, email} = req.body;
    let user = {};

    user = await User.findByIdAndUpdate(req.userId, {name,email}, {new: true});
    
    return res.send({user});
  }catch (err) {
    console.log(err);
    return res.status(400).send({error: 'Error updating User'});
  }
});


module.exports = app => app.use('/user', router);

