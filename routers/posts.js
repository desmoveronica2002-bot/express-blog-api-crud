const express = require('express');

module.exports = function (posts) {
    const router = express.Router();

    // Index (bonus: restituisce JSON con la lista dei post)
    router.get('/', (req, res) => {
        res.json(posts);
    });

    // Show (bonus: restituisce JSON del singolo post)
    router.get('/:id', (req, res) => {
        const id = Number(req.params.id);
        const post = posts.find(p => p.id === id);
        if (!post) return res.status(404).send(`Post ${id} non trovato`);
        res.json(post);
    });

    // Create
    router.post('/', (req, res) => {
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const { title = `Post ${id}`, content = '', image = '', tags = [] } = req.body || {};
        const newPost = { id, title, content, image, tags };
        posts.push(newPost);
        res.send(`Creazione del post ${id}`);
    });

    // Update
    router.put('/:id', (req, res) => {
        const id = Number(req.params.id);
        const idx = posts.findIndex(p => p.id === id);
        if (idx === -1) return res.status(404).send(`Post ${id} non trovato`);
        posts[idx] = { id, ...(req.body || {}) };
        res.send(`Aggiornamento del post ${id}`);
    });

    // Delete
    router.delete('/:id', (req, res) => {
        const id = Number(req.params.id);
        const idx = posts.findIndex(p => p.id === id);
        if (idx === -1) return res.status(404).send(`Post ${id} non trovato`);
        posts.splice(idx, 1);
        res.send(`Cancellazione del post ${id}`);
    });

    return router;
};
