import { CurrentUserContext } from "contexts/CurrentUserContext";
import React, { useContext } from "react";

function Card({ card, onDeleteCard, onCardClick, onCardLike }) {
  const { name, link, likes, _id, owner } = card;

  const currentUser = useContext(CurrentUserContext);

  const isOwn = owner._id === currentUser._id;

  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  const cardLikeButtonClassName = `elements-grid__icon ${
    isLiked ? "elements-grid__icon_active" : " "
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleDeleteClick = () => {
    onDeleteCard(card);
  };

  const handleLikeClick = () => {
    onCardLike(_id, isLiked);
  };

  return (
    <div className="elements-grid__element">
      {isOwn && (
        <button
          type="button"
          className="elements-grid__trash"
          onClick={handleDeleteClick}
        >
          {" "}
        </button>
      )}
      <img
        src={link}
        alt={name}
        className="elements-grid__image"
        onClick={handleClick}
      />
      <div className="elements-grid__info">
        <h2 className="elements-grid__title">{name}</h2>
        <div className="elements-grid__info-icon">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="elements-grid__likes-counter">{likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
