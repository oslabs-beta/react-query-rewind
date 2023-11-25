const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// fetching initital data
app.get('/fetch-data', async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, 'database.json'),
      'utf8'
    );
    res.status(200).json(JSON.parse(data).posts);
  } catch (err) {
    console.error('Error reading from database.json:', err);
    res.status(500).send('Error reading data');
  }
});

// create post
app.post('/create-post', async (req, res) => {
  try {
    const dbPath = path.join(__dirname, 'database.json');
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);

    const newPost = req.body;
    db.posts.unshift(newPost);

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

    res.status(201).json(db.posts);
  } catch (err) {
    console.error('Error updating database.json:', err);
    res.status(500).send('Error saving data');
  }
});

// like post
app.post('/like-post', async (req, res) => {
  try {
    const dbPath = path.join(__dirname, 'database.json');
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);

    const index = parseInt(req.body.index, 10);

    const updatedPostsArray = db.posts.map((post, curIndex) => {
      return {
        ...post,
        liked: index === curIndex ? !post.liked : post.liked,
      };
    });

    db.posts = updatedPostsArray;

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

    res.status(201).json(db.posts);
  } catch (err) {
    console.error('Error updating database.json:', err);
    res.status(500).send('Error saving data');
  }
});

// delete post
app.post('/delete-post', async (req, res) => {
  try {
    const dbPath = path.join(__dirname, 'database.json');
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);

    const index = parseInt(req.body.index, 10);

    const updatedPostsArray = db.posts.filter((_, curIndex) => {
      return curIndex !== index;
    });

    db.posts = updatedPostsArray;

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

    res.status(201).json(db.posts);
  } catch (err) {
    console.error('Error updating database.json:', err);
    res.status(500).send('Error saving data');
  }
});

// create commment
app.post('/create-comment', async (req, res) => {
  try {
    const dbPath = path.join(__dirname, 'database.json');
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);

    const { index, comment } = req.body;
    const postIndex = parseInt(index, 10);

    db.posts[postIndex].comments.push(comment);
    db.posts[postIndex].createComment = true;

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

    res.status(201).json(db.posts);
  } catch (err) {
    console.error('Error updating database.json:', err);
    res.status(500).send('Error saving data');
  }
});

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
