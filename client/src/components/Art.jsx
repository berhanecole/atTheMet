import React from 'react';
import axios from 'axios';

class Art extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      featuredPiece: this.props.featuredPiece
    };
    // this.favoriteClick = favoriteClick.bind(this);
    // this.unfavoriteClick = unfavoriteClick.bind(this);
  }

  // favoriteClick() {
  //   const { favorite, featuredPiece } = this.props;

  // }

  // unfavoriteClick() {
  //   const { unfavorite, featuredPiece } = this.props;

  // }

  // componentDidMount() {
  //   this.se
  // }

  render() {
    const { featuredPiece, isLoggedIn, tags, favorite, unfavorite, deletePiece, random } = this.props;

    featuredPiece;
    console.log('THIS IS FEATURED PIECE', featuredPiece);
    console.log(featuredPiece.tags);


    return isLoggedIn ? (
      <div>
        <h2>{featuredPiece.title}</h2>
        <img src={featuredPiece.imageSmall} />
        <h5>Artist: {featuredPiece.artist}</h5>
        <h4>{ featuredPiece.artistBio }</h4>
        <h4>Date: { featuredPiece.date }</h4>
        <h4>Medium: {featuredPiece.medium} </h4>
        <h4>Dimensions: {featuredPiece.dimension} </h4>
        { tags.map((tag, i) => {
          return (
            <span key={i}> {tag} </span>
          );
        }) }
        <br />
        <a href={featuredPiece.externalUrl}>Read More</a>
        <br />
        <button type="button" className="btn btn-outline-success" onClick={favorite}>Favorite</button>
        <button type="button" className="btn btn-outline-danger" onClick={unfavorite}>Unfavorite</button>
        <button type="button" className="btn btn-outline-dark" onClick={deletePiece}>DELETE</button>
      </div>
    ) : (
      <div>
        <h2>{featuredPiece.title}</h2>
        <img src={featuredPiece.imageSmall}/>
        <h5>Artist: {featuredPiece.artist}</h5>
        <h4>{ featuredPiece.artistBio }</h4>
        <h4>Date: { featuredPiece.date }</h4>
        <h4>Medium: {featuredPiece.medium} </h4>
        <h4>Dimensions: {featuredPiece.dimension} </h4>
        { tags.map((eachTag, i) => {
          return (
            <span key={i}> {eachTag}, </span>
          );
        }) }
        <br />
        <a href={featuredPiece.externalUrl}>Read More</a>
      </div>
    );
  }
}

export default Art;