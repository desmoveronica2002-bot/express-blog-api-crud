const posts = require('../data/posts');

module.exports = {
	index: (req, res) => {
		res.json(posts);
	},

	show: (req, res) => {
		const id = Number(req.params.id);
		const post = posts.find(p => p.id === id);
		if (!post) return res.status(404).json({ error: `Post ${id} non trovato` });
		res.json(post);
	},

	create: (req, res) => {
		console.log(req.body);


		const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
		const { title = `Post ${id}`, content = '', image = '', tags = [] } = req.body || {};
		const newPost = { id, title, content, image, tags };
		posts.push(newPost);
		res.status(201).json(newPost);
	},

	update: (req, res) => {
		const id = Number(req.params.id);
		const idx = posts.findIndex(p => p.id === id);
		if (idx === -1) return res.status(404).send(`Post ${id} non trovato`);
		posts[idx] = { id, ...(req.body || {}) };
		res.json(posts[idx]);
	},

	destroy: (req, res) => {
		const id = Number(req.params.id);
		const idx = posts.findIndex(p => p.id === id);
		if (idx === -1) return res.status(404).json({ error: `Post ${id} non trovato` });
		posts.splice(idx, 1);
		console.log(posts);
		res.status(204).end();
	}
};
