const axios = require('axios');
const { Piece } = require('../db/index.js');

const metAPISearch = (query) => {
  let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`;
  //maybe return a random index that is not in db
  console.log(query);
  return axios.get(url, (data) => {
    return data;
  }).then(results => {
    const randomIndex = Math.floor(Math.random() * results.data.objectIDs.length);
    return results.data.objectIDs[randomIndex];
  }
  ).then((objectId) => {
    url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
    return axios.get(url, (data, err) => {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    });
  }).catch(err => {
    console.log(err);
  });
};

module.exports.metAPISearch = metAPISearch;



