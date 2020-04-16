const express = require('express');
const authMiddleware = require('../middleware/auth');
const Todo = require('../models/Todo');

const router = express.Router();
router.use(authMiddleware);

//Create
router.post('/', async (req, res) => {
  try{
    const todo = await Todo.create({...req.body, user: req.userId});
    await todo.save();
    return res.send({todo});
  }catch (err) {
    return res.status(400).send({error: 'Error loading Todo'});
  }
});

//List
router.get('/getAll', async (req, res) => {
  try{
    const todos = await Todo.find({user: req.userId});

    return res.send({todos});
  }catch (err) {
    return res.status(400).send({error: 'Error loading Todos'});
  }
});

//Show
router.get('/:TodoId', async (req, res) => {
  try{
    const todo = await Todo.findById(req.params.TodoId).populate(['user']);
    if(todo.user._id != req.userId)
      return res.status(400).send({error: 'Permission Denied'});

    return res.send({todo});
  }catch (err) {
    return res.status(400).send({error: 'Error loading Todo'});
  }
});

//Edit
router.post('/:TodoId', async (req, res) => {
  try{
    const todo = await Todo.findById(req.params.TodoId).populate(['user']);
    if(todo.user._id != req.userId)
      return res.status(400).send({error: 'Permission Denied'});

    const { description, isDone} = req.body;
    todo.description = description;
    todo.isDone = isDone;
    await todo.save();

    return res.send({todo});
  }catch (err) {
    return res.status(400).send({error: 'Error loading Todo'});
  }
});

//Delete
router.delete('/:TodoId', async (req, res) => {
  try{
    const todo = await Todo.findById(req.params.TodoId);

    if(todo.user._id != req.userId)
      return res.status(400).send({error: 'Permission Denied'});

    todo.remove();

    return res.send({});
  }catch (err) {
    return res.status(400).send({error: 'Error deleting Todo'});
  }
});

router.post('/done/:TodoId',async (req, res) => {
  try{
    let todo = await Todo.findById(req.params.TodoId);

    if(todo.user._id != req.userId)
      return res.status(400).send({error: 'Permission Denied'});

    todo.isDone = !todo.isDone;
    await todo.save();

    return res.send({todo});
  }catch (err) {
    return res.status(400).send({error: 'Error deleting Todo'});
  }
});


module.exports = app => app.use('/todo', router);

