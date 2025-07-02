import express from 'express';

const app = express();
const port = 3000;
const posts = [];

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {posts: posts});
})

app.get('/compose', (req, res) => {
    res.render('compose', {post: null});
})

app.get('/edit/:id', (req, res) => {
    const postId = Number(req.params.id);
    const edit = posts.find(post => post.id === postId);
    res.render('compose', {post: edit});
})

app.post("/compose", (req, res) => {
    const post = {
        id: posts.length + 1,
        title: req.body.title,
        body: req.body.body
    };

    posts.push(post);
    res.redirect('/');
});
app.post("/edit/:id", (req, res) => {
    const postId = Number(req.params.id);

    const post = posts.find(post => post.id === postId);

    if (post) {
        post.title = req.body.title;
        post.body = req.body.body;
    }

    res.redirect("/");
})


app.listen(port, () => console.log(`Listening on port ${port}`));