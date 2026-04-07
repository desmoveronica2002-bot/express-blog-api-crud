const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Static assets (metti le immagini assets/images)
app.use(express.static(path.join(__dirname, 'assets')));
// JSON body parsing
app.use(express.json());

// I dati dei post vengono importati da data/posts.js
const posts = require('./data/posts');

// Route /
app.get('/', (req, res) => {
  res.send('Server del mio blog');
});

// Route /bacheca che restituisce i post in JSON
app.get('/bacheca', (req, res) => {
  res.json({ posts });
});

// Posts router (CRUD)
const postsRouter = require('./routers/posts');
app.use('/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});