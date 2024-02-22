const bodyParser = require('body-parser');
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    uuid = require('uuid');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "Evan",
        favoriteMovies: []
    },
    {   
        id: 2,
        name: "Alexis",
        favoriteMovies: []
    },
]

let movies = [
    {
        "Title": "The Farewell",
        "Description": "A Chinese family discovers their grandmother has only a short while left to live and decide to keep her in the dark, scheduling a wedding to gather before she dies.",
        "Genre": {
            "Name": "Drama",
            "Description":"A genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        "Director": {
            "Name": "Lulu Wang",
            "Bio": "Lulu Wang was born February 25, 1983 and is a Chinese-born American filmmaker. She is best known for writing and directing the comedy-drama films Posthumous (2014) and The Farewell (2019). For the latter, she received the Independent Spirit Award for Best Film and the film was named one of the top ten films of 2019 by the American Film Institute. Wang has also written, produced, and directed several short films, documentaries, and music videos.",
            "Birth": 1983.0
        },
        "ImageURL":"https://images.app.goo.gl/Tn4jRnSP5xyXZqTP9",
        "Featured": false
    },
    {
        "Title": "Mulan",
        "Description": "To save her father from death in the army, a young maiden secretly goes in his place and becomes one of China's greatest heroines in the process.",
        "Genre": {
            "Name": "Action",
            "Description":"A genre featuring characters involved in exciting and usually dangerous activities and adventures."
        },
        "Director": {
            "Name": "Tony Bancroft",
            "Bio": "Tony Bancroft is an American animator and film director who frequently collaborates with Disney. He is the founder and owner of the faith-driven animation company Toonacious Family Entertainment. Tony is the Executive VP Creative Development and Production for DivideNine Animation Studios.",
            "Birth": 1967.0
        },
        "ImageURL":"https://images.app.goo.gl/s9DcrURzwNYdtdNs8",
        "Featured": false
    },
    {
        "Title": "The Lord of the Rings: The Fellowship of the Ring",
        "Description": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
        "Genre": {
            "Name": "Fantasy",
            "Description": "A genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. The genre is considered a form of speculative fiction alongside science fiction films and horror films, although the genres do overlap. Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary."
        },
        "Director": {
            "Name": "Peter Jackson",
            "Bio": "Sir Peter Robert Jackson ONZ KNZM (born 31 October 1961) is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. Other notable films include the critically lauded drama Heavenly Creatures (1994), the horror comedy The Frighteners (1996), the epic monster remake film King Kong (2005), the World War I documentary film They Shall Not Grow Old (2018) and the documentary The Beatles: Get Back (2021). He is the fourth-highest-grossing film director of all-time, his films having made over $6.5 billion worldwide.",
            "Birth": 1961.0
        },
        "ImageURL":"https://images.app.goo.gl/S7kcBBRm4x3nhazu7",
        "Featured": false
    },
    {
        "Title": "The Lord of the Rings: The Two Towers",
        "Description": "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
        "Genre": {
            "Name": "Fantasy",
            "Description": "A genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. The genre is considered a form of speculative fiction alongside science fiction films and horror films, although the genres do overlap. Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary."
        },
        "Director": {
            "Name": "Peter Jackson",
            "Bio": "Sir Peter Robert Jackson ONZ KNZM (born 31 October 1961) is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. Other notable films include the critically lauded drama Heavenly Creatures (1994), the horror comedy The Frighteners (1996), the epic monster remake film King Kong (2005), the World War I documentary film They Shall Not Grow Old (2018) and the documentary The Beatles: Get Back (2021). He is the fourth-highest-grossing film director of all-time, his films having made over $6.5 billion worldwide.",
            "Birth": 1961.0
        },
        "ImageURL":"https://images.app.goo.gl/i5fMhr4Q17s59Dm77",
        "Featured": false
    },
    {
        "Title": "The Lord of the Rings: Return of the King",
        "Description": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        "Genre": {
            "Name": "Fantasy",
            "Description": "A genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. The genre is considered a form of speculative fiction alongside science fiction films and horror films, although the genres do overlap. Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary."
        },
        "Director": {
            "Name": "Peter Jackson",
            "Bio": "Sir Peter Robert Jackson ONZ KNZM (born 31 October 1961) is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. Other notable films include the critically lauded drama Heavenly Creatures (1994), the horror comedy The Frighteners (1996), the epic monster remake film King Kong (2005), the World War I documentary film They Shall Not Grow Old (2018) and the documentary The Beatles: Get Back (2021). He is the fourth-highest-grossing film director of all-time, his films having made over $6.5 billion worldwide.",
            "Birth": 1961.0
        },
        "ImageURL":"https://images.app.goo.gl/8CNNsCUYoznFtGP17",
        "Featured": false
    },
    {
        "Title": "Dan in Real Life",
        "Description": "A widower finds out the woman he fell in love with is his brother's girlfriend.",
        "Genre": {
            "Name": "Drama",
            "Description":"A genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        "Director": {
            "Name": "Peter Hedges",
            "Bio": "Peter Simpson Hedges (born July 6, 1962) is an American novelist, playwright, screenwriter, film director and film producer.",
            "Birth": 1962.0
        },
        "ImageURL":"https://images.app.goo.gl/ACVmQ81cJ8wCu9Zs5",
        "Featured": false
    },
    {
        "Title": "Weekend",
        "Description": "After a drunken house party with his straight mates, Russell heads out to a gay club. Just before closing time he picks up Glen but what's expected to be just a one-night stand becomes something else, something special.",
        "Genre": {
            "Name": "Drama",
            "Description":"A genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        "Director": {
            "Name": "Andrew Haigh",
            "Bio": "Andrew Haigh is an English filmmaker. He is best known for writing and directing the films Weekend, 45 Years, Lean on Pete, and All of Us Strangers. He also wrote and produced the HBO series Looking and its film sequel Looking: The Movie, as well as the BBC Two limited series The North Water.",
            "Birth": 1973.0
        },
        "ImageURL":"https://images.app.goo.gl/rJ2To1tiVnhQMCzm7",
        "Featured": false
    },
    {
        "Title": "All of Us Strangers",
        "Description": "A screenwriter drawn back to his childhood home enters into a fledgling relationship with a mysterious neighbor as he then discovers his parents appear to be living just as they were on the day they died, 30 years before.",
        "Genre": {
            "Name": "Drama",
            "Description":"A genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        "Director": {
            "Name": "Andrew Haigh",
            "Bio": "Andrew Haigh is an English filmmaker. He is best known for writing and directing the films Weekend, 45 Years, Lean on Pete, and All of Us Strangers. He also wrote and produced the HBO series Looking and its film sequel Looking: The Movie, as well as the BBC Two limited series The North Water.",
            "Birth": 1973.0
        },
        "ImageURL":"https://images.app.goo.gl/NNYtvwb9PbLbUrG86",
        "Featured": false
    },
    {
        "Title": "Looking",
        "Description": "Patrick returns to San Francisco in search of closure and resolution regarding his relationships with Richie and Kevin.",
        "Genre": {
            "Name": "Drama",
            "Description":"A genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        "Director": {
            "Name": "Andrew Haigh",
            "Bio": "Andrew Haigh is an English filmmaker. He is best known for writing and directing the films Weekend, 45 Years, Lean on Pete, and All of Us Strangers. He also wrote and produced the HBO series Looking and its film sequel Looking: The Movie, as well as the BBC Two limited series The North Water.",
            "Birth": 1973.0
        },
        "ImageURL":"https://images.app.goo.gl/5cEGDDKqxCJ7wEHr9",
        "Featured": false
    },
    {
        "Title": "Princess Mononoke",
        "Description": "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.",
        "Genre": {
            "Name": "Fantasy",
            "Description": "A genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. The genre is considered a form of speculative fiction alongside science fiction films and horror films, although the genres do overlap. Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary."
        },
        "Director": {
            "Name": "Hayao Miyazaki",
            "Bio": "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
            "Birth": 1941.0
        },
        "ImageURL": "https://images.app.goo.gl/dNdQw2ecmp7MmXpUA",
        "Featured": false
    },
];

// CREATE - New users
app.post('/users', (req, res) => {
    const newUser = req.body;

    if(newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send ('users need names')
    }
})

// UPDATE  - User info
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    
    let user = users.find(user => user.id == id);

    if(user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})

// CREATE  - Add movie to favorites
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    
    let user = users.find(user => user.id == id);

    if(user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
})


// DELETE  - Remove movie from favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    
    let user = users.find(user => user.id == id);

    if(user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
})

// DELETE  - Existing users to deregister
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    
    let user = users.find(user => user.id != id);

    if(user) {
        users = users.filter(user => user.id );
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('no such user')
    }
})


// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
});

app.use('public/documentation.html', express.static('public'));

// READ - Return list of all movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

// READ - Return data about a single movie by title
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
})

// READ - Return data about genre
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
})

// READ - Return data about a director
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }
})



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});