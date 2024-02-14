const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));

let topMovies = [
    {
        title: 'The Farewell'
    },
    {
        title: 'Mulan'
    },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring'
    },
    {
        title: 'The Lord of the Rings: The Two Towers'
    },
    {
        title: 'The Lord of the Rings: Return of the King'
    },
    {
        title: 'Dan in Real Life'
    },
    {
        title: 'Weekend'
    },
    {
        title: 'All of Us Strangers'
    },
    {
        title: 'Looking'
    },
    {
        title: 'Princess Mononoke'
    },
];

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
});

app.use('public/documentation.html', express.static('public'));

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});