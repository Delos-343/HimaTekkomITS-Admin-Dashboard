require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors'); // Add this line

// Create an instance of Express.js
const app = express();

app.use(cors()); // Add this line

// Set up body-parser middleware
app.use(bodyParser.json());

// Set up MySQL connection using Sequelize
const sequelize = new Sequelize('n1572535_beritahimpunantekkomits', 'n1572535_daffawibi', 'banyakbelajarpintar123', {
  host: 'muhdaffawibi.com',
  port: 3306,
  dialect: 'mariadb',
});

// Define News model
const News = sequelize.define('News', {
  author: DataTypes.STRING,
  title: DataTypes.STRING,
  caption: DataTypes.TEXT,
  content: DataTypes.TEXT,
  image: DataTypes.STRING,
});

// Create the table if it doesn't exist
News.sync();

// Create a news
app.post('/news', async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all news
app.get('/news', async (req, res) => {
  try {
    const news = await News.findAll();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a news by ID
app.get('/news/:id', async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (news) {
      res.json(news);
    } else {
      res.status(404).json({ error: 'News not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a news by ID
app.put('/news/:id', async (req, res) => {
  try {
    const [updatedRows] = await News.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 1) {
      res.json({ message: 'News updated successfully' });
    } else {
      res.status(404).json({ error: 'News not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a news by ID
app.delete('/news/:id', async (req, res) => {
  try {
    const deletedRows = await News.destroy({ where: { id: req.params.id } });
    if (deletedRows === 1) {
      res.json({ message: 'News deleted successfully' });
    } else {
      res.status(404).json({ error: 'News not found' });
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
