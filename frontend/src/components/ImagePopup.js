import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_img ${ Object.keys(props.card).length !== 0 ? 'popup_opened' : ''}`} onClick={props.onClose}>
      <div className="popup__container popup__container_place">
        <button className="popup__close popup__close_place" type="button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name}/>
        <p className="popup__text">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;