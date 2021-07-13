import React from 'react';
import axios from 'axios';

class Art extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    };
  }

  
  render() {
    const { featuredPiece } = this.state;
    return (
      
      <h2>Piece</h2>
 
    );
  }
}

export default Art;