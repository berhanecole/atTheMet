
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
      tags: [],
      query: ''
    };


    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.randomPiece = this.randomPiece.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleUnfavorite = this.handleUnfavorite.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRetrieve = this.handleRetrieve.bind(this);
  }

  handleSearch(query) {
    if (query.length) {
      return axios.post('/routes/routes/featured', { query })
        .then(data => { this.setState({ featuredPiece: data.data }); })
        .catch(err => { console.log(err); });
    }
  }

  handleChange(e) {
    this.setState({value: e.target.query});
  }

  handleRegister(username, password) {
    if (username && password.length) {
      return axios.post('/routes/routes/register', { username, password })
        .then((data) => {
          console.log(data);
        }).catch(err => {
          console.log(err);
        });
    }
  }

  async handleLogin(username, password) {
    if (username && password.length) {
      return await axios.post('/routes/routes/login', { username, password })
        .then((data) => {
          console.log(data);
          this.setState({ user: data.data, isLoggedIn: true, favorites: data.data.favorites });
        }).catch(err => {
          console.log(err);
        });
    }
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({ user: new Object(), favorites: new Array(), isLoggedIn: false});
  }

  async handleFavorite() {
    if (this.state.isLoggedIn) {
      const { username } = this.state.user;
      const { apiID } = this.state.featuredPiece;
      return await axios.patch(`routes/routes/${username}/add/${apiID}`)
        .then(() => {
          console.log('successfully added favorite');
        }).catch(err => {
          console.log(err);
        });
    }
  }

  async handleUnfavorite() {
    if (this.state.isLoggedIn) {
      const { username } = this.state.user;
      const { apiID } = this.state.featuredPiece;
      return await axios.patch(`routes/routes/${username}/delete/${apiID}`)
        .then(() => {
          console.log('successfully removed favorite');
        }).catch(err => {
          console.log(err);
        });
    }
  }

  handleDelete() {
    const { apiID } = this.state.featuredPiece;
    return axios.delete(`routes/routes/piece/${apiID}`)
      .then(() => { console.log('piece deleted from database'); })
      .catch(err => { console.log(err); });
  }


  handleRetrieve(objectID) {
    return axios.get(`routes/routes/piece/${objectID}`)
      .then(data => {
        console.log(data.data);
        return this.setState({featuredPiece: data.data[0], pieces: this.state.pieces.push(data.data[0])});
      })
      .catch(err => {
        console.log(err);
      });

  }

  randomPiece() {
    return axios.get('/routes/routes/random')
      .then(data => { this.setState({ featuredPiece: data.data }); })
      .then(() => {
        this.setState({ tags: this.state.featuredPiece.tags});
        console.log(this.state.featuredPiece);
      });
  }

  componentDidMount() {
    axios.get('/routes/routes/random')
      .then(data => { this.setState({ featuredPiece: data.data }); })
      .then(() => {
        this.setState({ tags: this.state.featuredPiece.tags});
        console.log(this.state.featuredPiece);
      }).then(() => {
        axios.get('/routes/routes/')
          .then(data => { this.setState({ pieces: data.data}); })
          .then(() => console.log(this.state.pieces));
      });
  }

  componentDidUpdate(prevState) {
    if (this.state.featuredPiece.tags !== this.state.tags) {
      this.setState({ tags: this.state.featuredPiece.tags});
    } 
    if (this.state.user.favorites) {
      if (this.state.user.favorites.length !== this.state.favorites.length) {
        this.setState({ favorites: this.state.favorites});
      }
    }
  }

  render() {
    const { pieces, favorites, featuredPiece, user, isLoggedIn, tags } = this.state;
    return (
      <>
        < Navbar
          logout={this.handleLogout}
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
          deletePiece={this.handleDelete}
          tags={tags}
        />
        < ArtList 
          favorites={favorites} 
          user={user} 
          isLoggedIn={isLoggedIn} 
          pieces={pieces}
          retrieve={this.handleRetrieve}
        />
      </>
    );
  }
}


export default App;