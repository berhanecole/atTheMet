
import React from 'react';
import axios from 'axios';
import * as _ from 'underscore';

import Art from './Art';
import ArtList from './ArtList';
import Navbar from './Navbar';
import Search from './Search';
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [],
      favorites: [],
      featuredPiece: {},
      user: {},
      isLoggedIn: false,
      query: ''
    };


    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.randomPiece = this.randomPiece.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleUnfavorite = this.handleUnfavorite.bind(this);
  }

  handleSearch(query) {
    if (query.length) {
      axios.get('/routes/routes/featured', { query })
        .then(data => { this.setState({ featuredPiece: data.data }); });
    }
  }

  handleChange(e) {
    this.setState({value: e.target.query});
  }

  handleRegister(username, password) {
    if (username && password.length) {
      axios.post('/routes/routes/register', { username, password })
        .then((data) => {
          console.log(data);
        }).catch(err => {
          console.log(err);
        });
    }
  }

  handleLogin(username, password) {
    if (username && password.length) {
      axios.login('/routes/routes/login', { username, password })
        .then((data) => {
          console.log(data);
          if (data.apiID) {
            this.setState({ user: data.data, isLoggedIn: true });
          }
        }).catch(err => {
          console.log(err);
        });
    }
  }

  handleFavorite() {
    if (isLoggedIn) {
      const { username } = this.state.user;
      const { apiID } = this.state.featuredPiece;
      axios.patch(`/${username}/add/${apiID}`)
        .then(() => {
          console.log('successfully added favorite');
        }).catch(err => {
          console.log(err);
        });
    }
  }

  handleUnfavorite() {
    if (isLoggedIn) {
      const { username } = this.state.user;
      const { apiID } = this.state.featuredPiece;
      axios.patch(`/${username}/delete/${apiID}`)
        .then(() => {
          console.log('successfully removed favorite');
        }).catch(err => {
          console.log(err);
        });
    }
  }

  randomPiece() {
    axios.get('/routes/routes/random')
      .then(data => { this.setState({ featuredPiece: data.data }); })
      .then(() => {
        console.log(this.state.featuredPiece);
      });
  }

  componentDidMount() {
    axios.get('/routes/routes/random')
      .then(data => { this.setState({ featuredPiece: data.data }); })
      .then(() => {
        console.log(this.state.featuredPiece);
      });
    axios.get('/routes/routes/')
      .then(data => { this.setState({ pieces: data.data}); })
      .then(() => console.log(this.state.pieces));
  }

  render() {
    const { pieces, favorites, featuredPiece, user, isLoggedIn } = this.state;
    return (
      <>
        < Navbar
          login={this.handleLogin}
          register={this.handleRegister}
          user={user}
          isLoggedIn={isLoggedIn} />
        <h1>{this.props.title}</h1>
        < Search
          onSearch={this.handleSearch} />
        < Art 
          featuredPiece={featuredPiece}
          user={user} 
          isLoggedIn={isLoggedIn}
          favorite={this.handleFavorite}
          unfavorite={this.handleUnfavorite}
          random={this.randomPiece}
        />
        < ArtList 
          favorites={favorites} 
          user={user} 
          isLoggedIn={isLoggedIn} 
          pieces={pieces}
          favorite={this.handleFavorite}
          unfavorite={this.handleUnfavorite} />
      </>
    );
  }
}

// import Art from './Art';
// import ArtList from './ArtList';
// import Navbar from './Navbar';
// import Search from './Search';



export default App;