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
    res.render('compose');
})

app.post("/compose", (req, res) => {
    const post = {
        title: req.body.title,
        body: req.body.body
    };

    posts.push(post);
    res.redirect('/');
});


app.listen(port, () => console.log(`Listening on port ${port}`));