import React from 'react';

class ArtList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  
    // this.clickRetrieve = this.clickRetrieve.bind(this);
  }
  render() {
    const { pieces, favorites, user, isLoggedIn, retrieve } = this.props;
    return favorites.length ? (
      <div>
        <h2>Favorites</h2>
        { favorites.map((piece, i) => {
          return <p key={i} onClick={() => {
            return retrieve(piece.apiID);
          }}>{piece.title}</p>;
        } )}
      </div>
    ) : (
      <div>
        <h2>Pieces In Database</h2>
        { pieces.map((piece, i) => {
          return <p key={i} onClick={() => {
            return retrieve(piece.apiID);
          }}>{piece.title}</p>;
        } )}
      </div>
    );
  }
}

export default ArtList;