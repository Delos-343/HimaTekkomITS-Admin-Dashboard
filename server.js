require('dotenv').config()
import express from 'express';
import json from 'body-parser';
import { Sequelize, DataTypes } from 'sequelize';
import cors from 'cors';

// Create an instance of Express.js
const app = express();

app.use(cors()); // Add this line

// Set up body-parser middleware
app.use(json());

// Set up MySQL connection using Sequelize
const sequelize = new Sequelize('n1572535_beritahimpunantekkomits', 'n1572535_daffawibi', 'banyakbelajarpintar123', {
  host: 'muhdaffawibi.com',
  port: 3306,
  dialect: 'mariadb',
});

// Define Notes model
const Notes = sequelize.define('Notes', {
  author: DataTypes.STRING,
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
});

// Create the table if it doesn't exist
Notes.sync();

// Create a note
app.post('/note', async (req, res) => {
  try {
    const notes = await Notes.create(req.body);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all notes
app.get('/note', async (req, res) => {
  try {
    const notes = await Notes.findAll();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a note by ID
app.get('/note/:id', async (req, res) => {
  try {
    const notes = await Notes.findByPk(req.params.id);
    if (notes) {
      res.json(notes);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a note by ID
app.put('/note/:id', async (req, res) => {
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
app.delete('/note/:id', async (req, res) => {
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

const PORT = process.env.PORT || 3000

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
