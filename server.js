// CORS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://adminkeren:banyakbelajarpintar@cluster0.qcaoomm.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

// Schema
const notesSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  created_at: { type: Date, default: Date.now }
});

// Model
const Notes = mongoose.model('Notes', notesSchema);

// Routes
app.get('/', async (req, res) => {
  const notes = await Notes.find();
  res.send(notes);
});

app.post('/', async (req, res) => {
  const notes = new Notes({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date
  });
  await notes.save();
  res.send(notes);
});

app.get('/:id', async (req, res) => {
  try {
    const notes = await Notes.findOne({ _id: req.params.id });
    res.send(notes);
  } catch {
    res.status(404);
    res.send({ error: "Note doesn't exist!" });
  }
});

app.patch('/', async (req, res) => {
  try {
    const notes = await Notes.findOne({ _id: req.params.id });

    if (req.body.title) {
      notes.title = req.body.title;
    }

    if (req.body.content) {
      notes.content = req.body.content;
    }

    if (req.body.date) {
      notes.date = req.body.date;
    }

    await notes.save();
    res.send(notes);
  } catch {
    res.status(404);
    res.send({ error: "Note doesn't exist!" });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    await Notes.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Note doesn't exist!" });
  }
});

// Start server
app.listen(3001, () => console.log('Server listening on port 3001'));