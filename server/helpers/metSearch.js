import axios from 'axios';
const { Piece, User } = require('./db/index.js');

const metAPISearch = (query) => {
  let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`;
  // return new Promise(resolve, reject)
  axios.get(url, (req, res) => {

  }
  );
};

module.exports.metAPISearch = metAPISearch;



