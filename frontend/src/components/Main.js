import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__all-info">
            <div className="profile__avatar-block" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
            </div>
            <div className="profile__info">  
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={props.onEditProfile} alt="Редактировть"></button>
                <p className="profile__description">{currentUser.about}</p>
            </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace} aria-label="Добавлять"></button>
      </section>
      <section className="elements">
      {props.cards.map((card) => (
          <Card
            key={card._id}
            cardId={card._id}
            name={card.name}
            link={card.link}
            ownerId={card.owner._id}
            likes={card.likes}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;