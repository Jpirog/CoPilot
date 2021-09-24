import StarRatingComponent from 'react-star-rating-component';
import React from "react";


const RatingStar = ({rating}) => {

  return <StarRatingComponent
  name="app6"
  starColor="#ffb400"
  emptyStarColor="#ffb400"
  value={rating}
  renderStarIcon={(index, value) => {
    return (
      <span>
        <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
      </span>
    );
  }}
  renderStarIconHalf={() => {
    return (
      <span>
        <span style={{position: 'absolute'}}><i className="far fa-star" /></span>
        <span><i className="fas fa-star-half" /></span>
      </span>
    );
  }} />
}

export default RatingStar;