const { Router } = require('express');
const { Piece, User } = require('../db/index');
const { metAPISearch } = require ('../helpers/metSearch');

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

//get piece by tag
ArtRoutes.get('/tag', (req, res) => {
  const { tag } = req.body;
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
ArtRoutes.route('/piece/:id')
  .get((req, res) => {
    const { id } = req.params;
  })

//patch piece from database
  .patch((req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
  })
//delete piece from database
  .delete((req, res) => {
    const { id } = req.params;
  });


//USER ROUTES
// get user information
// ArtRoutes.get()

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
ArtRoutes.patch('/:username/add/:id', (req, res) => {
  const { username, id } = req.params;

});

//delete piece from favorites
ArtRoutes.patch('/:username/delete/:id', (req, res) => {
  const { username, id } = req.params;

});



module.exports = { 
  ArtRoutes,
};