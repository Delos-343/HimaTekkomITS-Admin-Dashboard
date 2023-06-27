
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

// Create an instance of Express.js
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Set up MySQL connection using Sequelize
const sequelize = new Sequelize('n1572535_beritahimpunantekkomits', 'n1572535_daffawibi', 'banyakbelajarpintar123', {
  host: 'muhdaffawibi.com',
  port: 3306,
  dialect: 'mariadb',
});

// Define Notes model
const Notes = sequelize.define('Notes', {
  title: DataTypes.STRING,
  toDo: DataTypes.STRING,
  dates: DataTypes.STRING,
});

// Create the table if it doesn't exist
Notes.sync();

// Create a note
app.post('/notes', async (req, res) => {
  try {
    const note = await Notes.create(req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Notes.findAll();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a note by ID
app.get('/notes/:id', async (req, res) => {
  try {
    const note = await Notes.findByPk(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a note by ID
app.put('/notes/:id', async (req, res) => {
  try {
    const [updatedRows] = await Notes.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 1) {
      res.json({ message: 'Note updated successfully' });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a note by ID
app.delete('/notes/:id', async (req, res) => {
  try {
    const deletedRows = await Notes.destroy({ where: { id: req.params.id } });
    if (deletedRows === 1) {
      res.json({ message: 'Note deleted successfully' });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
