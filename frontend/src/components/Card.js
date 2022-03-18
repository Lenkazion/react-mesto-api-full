import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.ownerId === currentUser._id;
  const isLiked = props.likes.some(like => like._id === currentUser._id);

  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "" : "element__delete_hidden"
  }`;

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleCardClick() {
    props.onCardClick(props);
  }

  function handleCardLike() {
    props.onCardLike(props);
  }

  function handleCardDelete() {
    props.onCardDelete(props);
  }

  return (
    <article className="element">
      <img className="element__image" src={props.link} alt={props.name} onClick={handleCardClick}/>
      <button className={cardDeleteButtonClassName} type="button" aria-label="корзина" onClick={handleCardDelete}></button>
      <div className="element__container">
        <h2 className="element__title">{props.name}</h2>
        <div className="elements__like">
          <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleCardLike}></button>
          <span className="element__like_counter">{props.likes.length}</span>
        </div> 
      </div>
    </article>
  )
}

export default Card;