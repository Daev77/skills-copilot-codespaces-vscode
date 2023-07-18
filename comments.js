// Create web server

// Import modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Create web server
const app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Configure web server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Get all comments
app.get('/api/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    res.send(comments);
  });
});

// Get comment by id
app.get('/api/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    res.send(comment);
  });
});

// Create comment
app.post('/api/comments', (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
  });

  comment.save((err, comment) => {
    res.send(comment);
  });
});

// Update comment
app.put('/api/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, comment) => {
    res.send(comment);
  });
});

// Delete comment
app.delete('/api/comments/:id', (req, res) => {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    res.send(comment);
  });
});

// Start web server
app.listen(3000, () => {
  console.log('Server started at port 3000');
});  
 