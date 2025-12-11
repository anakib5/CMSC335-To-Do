const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', async (req, res) => {
  try {
    await Todo.create({
      text: req.body.text,
      doBy: req.body.doBy,
      urgency: req.body.urgency
    });
    res.redirect('/list');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving todo");
  }
});

router.get('/list', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.render('list', { todos });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading todos");
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/list');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting todo");
  }
});

module.exports = router;