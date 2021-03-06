import React, { useEffect } from 'react';
import docentTalk from '../docents';

// class Art extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       featuredPiece: this.props.featuredPiece
//     };
//     // this.favoriteClick = favoriteClick.bind(this);
//     // this.unfavoriteClick = unfavoriteClick.bind(this);
//   }
//   handleClick() {
//   }
//   render() {
const Art = ( props ) => {
  useEffect(docentTalk, []);

  const { featuredPiece, isLoggedIn, tags, favorite, unfavorite, deletePiece, random } = props;

  return isLoggedIn ? (
    <div className='container'>
      <h1 className='title'>{featuredPiece.title}</h1>
      <div className='row'>
        <div className='col-md-8'>
          <div className='art'>
            <a href={featuredPiece.externalUrl}>
              {/* crossOrigin='anonymous' */}
              <img src={featuredPiece.imageLarge} onClick={docentTalk} id='art-piece' />
            </a>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='info'>
            <h3>{featuredPiece.artist}</h3>
            <h6>{ featuredPiece.artistBio }</h6>
            <br />
            <h6>{ featuredPiece.date }</h6>
            <h6>{featuredPiece.medium} </h6>
            <h6>{featuredPiece.dimension} </h6>
            <br />
            <h6>tags:</h6>
            { tags.map((tag, i) => {
              return (
                <span key={i}> {tag} </span>
              );
            }) }
            <br />
            <a href={featuredPiece.externalUrl}>Read More</a>
            <br />
            <div className='button-group'>
              <button type="button" className="btn btn-outline-success" onClick={favorite}>Favorite</button>
              <button type="button" className="btn btn-outline-danger middle-button" onClick={unfavorite}>Unfavorite</button>
              <button type="button" className="btn btn-outline-dark" onClick={deletePiece}>DELETE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='container'>
      <h1 className='title'>{featuredPiece.title}</h1>
      <div className='row'>
        <div className='col-md-8'>
          <div className='art'>
            <a href={featuredPiece.externalUrl}>
              {/* crossOrigin='anonymous' */}
              <img src={featuredPiece.imageLarge} onClick={docentTalk} id='art-piece' />
            </a>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='info'>
            <h3>{featuredPiece.artist}</h3>
            <h6>{ featuredPiece.artistBio }</h6>
            <br />
            <h6>{ featuredPiece.date }</h6>
            <h6>{featuredPiece.medium} </h6>
            <h6>{featuredPiece.dimension} </h6>
            <br />
            <h6>tags:</h6>
            { tags.map((eachTag, i) => {
              return (
                <span key={i}> {eachTag}, </span>
              );
            }) }
            <br />
            <a href={featuredPiece.externalUrl}>Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
};
// }

export default Art;