
const mongoose = require('mongoose');
const DB = 'metDB';

mongoose.connect(`mongodb://localhost:27017/${db}`, 
  { useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
  console.log(`Successfully Connected to ${DB}`);
}).catch(err => {
  console.log(`Unsuccessfully Connected to ${DB} with ERROR ${err}`);
});

const PieceSchema = new mongoose.Schema({
  apiID: Number,
  image: String,
  title: String,
  artist: String,
  artistBio: String,
  date: String,
  medium: String,
  dimension: String,
  externalUrl: String,
  tags: [String],
});

const Piece = new mongoose.Model('Piece', PieceSchema);


const UserSchema = new mongoose.Schema({
  username: String,
  password: String,

});

const User = new mongoose.Model('User', UserSchema);

module.exports = {
  Piece,
  User
};