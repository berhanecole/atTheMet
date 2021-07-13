const { Router } = require('express');
const { Piece, User } = require('../db/index');
const { metAPISearch } = require ('../helpers/metSearch');
const _ = require('underscore');

const ArtRoutes = Router();

//routes
//get all pieces in database
ArtRoutes.get('/', (req, res) => {
  Piece.find({})
    .then((data) => {
      res.status(200).json(data);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//get random piece from database
ArtRoutes.get('/random', (req, res) => {
  Piece.find({})
    .then((data) => {
      console.log(data);
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomPiece = data[randomIndex];
      console.log(randomPiece);
      return randomPiece;
    }).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//get piece by tag
ArtRoutes.get('/tag', (req, res) => {
  const { tag } = req.body;
  Piece.find({tags: tag})
    .then(results => {
      console.log(tag);
      console.log(results);
      res.status(200).send(results);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//add a piece to database from API

ArtRoutes.get('/featured', async (req, res) => {
  const query = req.body;
  const { data } = await metAPISearch('renoir');
  return Piece.find({apiID: data.objectID})
    .then(results => {
      if (results.length) {
        console.log('already in DB');
        res.status(302).send('already in DB');
      } else {
        console.log(data);
        const tags = data.tags.map(tag => tag.term);
        const newPiece = new Piece({
          apiID: data.objectID,
          image: data.primaryImageSmall,
          title: data.title,
          artist: data.artistDisplayName,
          artistBio: data.artistDisplayBio,
          date: data.objectDate,
          medium: data.medium,
          dimension: data.dimensions,
          externalUrl: data.objectURL,
          tags: tags
        });
        newPiece.save().then(data => {
          console.log('new document saved');
          res.status(201).json(data);
        });
      }
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//get one piece from database
ArtRoutes.route('/piece/:objectID')
  .get((req, res) => {
    const { objectID } = req.params;
    Piece.find({apiID: objectID})
      .then(foundPiece => {
        if (foundPiece.length) {
          res.status(200).send(foundPiece);
        } else {
          res.status(404).send('document not found');
        }
      }).catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })

//patch piece from database
  .patch((req, res) => {
    const { objectID } = req.params;
    const { tag } = req.body;
    Piece.update({apiID: objectID}, { $push: { tags: tag }})
      .then((data) => {
        console.log(data);
        res.status(201).send('document successfully patched');
      }).catch(err => {
        console.log(err);
        res.status(500);
      });
  })
//delete piece from database
  .delete((req, res) => {
    const { objectID } = req.params;
    Piece.deleteOne({apiID: objectID})
      .then(() => {
        res.status(202).send('document deleted');
      }).catch(err => {
        console.log(err);
        res.status(500);
      });
  });


//USER ROUTES
// create user
ArtRoutes.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ password }).then(data => {
    if (data) {
      res.status(409).send('username taken');
    } else {
      const newUser = new User({
        username, password, favorites: [] 
      });
      newUser.save().then((data) => {
        console.log(data);
        res.status(201).send('registration successful');
      }).catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
    }
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

// get user information
ArtRoutes.get('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then((foundUser) => {
    if (foundUser) {
      if (password === foundUser.password) {
        console.log('login successful');
        res.status(200).send(foundUser);
      } else {
        res.status(401).send('login unsuccessful');
      }
    } else {
      res.status(404).send('user not found');
    }
  });
});

//display pieces from favorites
ArtRoutes.get('/:username/favorites', (req, res) => {
  const { username } = req.params;
  User.find({ username })
    .then((data) => {
      res.status(200).send(data.favorites);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    }); 
});

//add piece to favorites
ArtRoutes.patch('/:username/add/:pieceId', async (req, res) => {
  const { username, pieceId } = req.params;
  const piece = await Piece.findOne({apiID: pieceId});
  console.log(piece);
  User.update({ username }, { $push: { favorites: piece }})
    .then((data) => {
      console.log(data);
      res.send(201).send('successfully updated');
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//delete piece from favorites
ArtRoutes.patch('/:username/delete/:pieceId', async (req, res) => {
  const { username, pieceId } = req.params;
  const piece = await Piece.findOne({apiID: pieceId});
  console.log(piece);
  User.update({ username }, { $pull: { favorites: piece }})
    .then((data) => {
      console.log(data);
      res.status(201).send('successfully updated');
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});



module.exports = { 
  ArtRoutes,
};