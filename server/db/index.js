
const mongoose = require('mongoose');
const DB = 'metDB';

mongoose.connect(`mongodb://localhost:27017/${DB}`, 
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
  console.log(`Successfully Connected to ${DB}`);
}).catch(err => {
  console.log(`Unsuccessfully Connected to ${DB} with ERROR ${err}`);
});

const PieceSchema = new mongoose.Schema({
  apiID: {
    type: Number,
    unique: true
  },
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

const Piece = new mongoose.model('Piece', PieceSchema);


const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  favorites: {
    type: [PieceSchema],
    default: undefined
  }
});

const User = new mongoose.model('User', UserSchema);

module.exports = {
  Piece,
  User
};