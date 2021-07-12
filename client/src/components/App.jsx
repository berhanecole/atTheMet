
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
      user: {}
    };

  }
  render() {
    return <h1>{this.props.title}</h1>;
  }
}



export default App;