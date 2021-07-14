import React from 'react';

class ArtList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  
    // this.clickRetrieve = this.clickRetrieve.bind(this);
  }
  render() {
    const { pieces, favorites, retrieve } = this.props;
    return favorites.length ? (
      <div>
        <h2 className='database'>Your Favorites</h2>
        <div className='container'>
          <div className='row'>
            { favorites.map((piece, i) => {
              return <div className='col-4 piece'> 
                <h5 key={i} onClick={() => {
                  return retrieve(piece.apiID);
                }}>{piece.title}</h5>
              </div>;
            } )}
          </div>
        </div>
      </div>
    ) : (
      <div>
        <h2 className='database'>Explore Our Database</h2>
        <div className='container'>
          <div className='row'>
            { pieces.map((piece, i) => {
              return <div className='col-4 piece'>
                <h5 key={i} onClick={() => {
                  return retrieve(piece.apiID);
                }}>{piece.title}</h5>
              </div>;
            } )}
          </div>
        </div>
      </div>
    );
  }
}

export default ArtList;