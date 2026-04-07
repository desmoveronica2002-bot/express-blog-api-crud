const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Static assets (metti le immagini assets/images)
app.use(express.static(path.join(__dirname, 'assets')));
// JSON body parsing
app.use(express.json());

// Array di post (almeno 5)
const posts = [
  {
    id: 1,
    title: "Primo post",
    content: "Benvenuti nel mio blog. Questo è il primo post.",
    image: "/images/post1.jpg",
    tags: ["intro", "benvenuto"]
  },
  {
    id: 2,
    title: "Node.js e Express",
    content: "Piccola guida su come iniziare con Node e Express.",
    image: "/images/post2.webp",
    tags: ["node", "express", "tutorial"]
  },
  {
    id: 3,
    title: "Routing",
    content: "Come creare route semplici e ristoranti di risposta.",
    image: "/images/post3.jpg",
    tags: ["routing", "api"]
  },
  {
    id: 4,
    title: "Gestion dei file statici",
    content: "Servire immagini e asset statici con Express.",
    image: "/images/post4.jpg",
    tags: ["static", "assets"]
  },
  {
    id: 5,
    title: "Conclusione",
    content: "Riepilogo delle funzionalità base del blog.",
    image: "/images/post5.jpg",
    tags: ["riassunto", "fine"]
  }
];

// Route /
app.get('/', (req, res) => {
  res.send('Server del mio blog');
});

// Route /bacheca che restituisce i post in JSON
app.get('/bacheca', (req, res) => {
  res.json({ posts });
});

// Posts router (CRUD)
const postsRouter = require('./routers/posts')(posts);
app.use('/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});