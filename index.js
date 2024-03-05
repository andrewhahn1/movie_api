const bodyParser = require('body-parser');
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    uuid = require('uuid');

const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js')
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });


// CREATE - New users
app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Name: req.body.Name,
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

// UPDATE  - User info
app.put('/users/:Username', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, 
        { 
        $set:{
        Name: req.params.Name,
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
  
  });

// CREATE  - Add movie to favorites
app.post('/users/:Username/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
       $push: { FavoriteMovies: req.params.MovieID }
     },
     { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });


// DELETE  - Remove movie from favorites
app.delete('/users/:Username/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $pull: { FavoriteMovies: req.params.MovieID } },
        { new: true }
    )
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// DELETE  - Existing users to deregister
app.delete("/users/:Username", (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
        } else {
            res.status(200).send(req.params.Username + ' was deleted.');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});


// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
});

app.use('public/documentation.html', express.static('public'));

// READ - Return list of all movies
app.get('/movies', async (req, res) => {
    await Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// READ - Return data about a single movie by title
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
    res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// READ - Return data about genre
app.get('/movies/genre/:genreName', (req, res) => {
    Movies.find({ Genre: req.params.genreName })
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// READ - Return data about a director
app.get('/movies/director/:Name', (req, res) => {
    Directors.findOne({ Director: req.params.directorName })
    .then((director) => {
    res.json(director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});