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
const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  date: Date,
  created_at: { type: Date, default: Date.now }
});

// Model
const News = mongoose.model('News', newsSchema);

// Routes
app.get('/news', async (req, res) => {
  const news = await News.find();
  res.send(news);
});

app.post('/news', async (req, res) => {
  const news = new News({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    date: req.body.date
  });
  await news.save();
  res.send(news);
});

app.get('/news/:id', async (req, res) => {
  try {
    const news = await News.findOne({ _id: req.params.id });
    res.send(news);
  } catch {
    res.status(404);
    res.send({ error: "News doesn't exist!" });
  }
});

app.patch('/news/:id', async (req, res) => {
  try {
    const news = await News.findOne({ _id: req.params.id });

    if (req.body.title) {
      news.title = req.body.title;
    }

    if (req.body.content) {
      news.content = req.body.content;
    }

    if (req.body.image) {
      news.image = req.body.image;
    }

    if (req.body.date) {
      news.date = req.body.date;
    }

    await news.save();
    res.send(news);
  } catch {
    res.status(404);
    res.send({ error: "News doesn't exist!" });
  }
});

app.delete('/news/:id', async (req, res) => {
  try {
    await News.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "News doesn't exist!" });
  }
});

// Start server
app.listen(3001, () => console.log('Server listening on port 3001'));