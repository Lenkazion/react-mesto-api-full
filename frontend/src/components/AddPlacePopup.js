import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const placeNameRef = React.useRef();
  const placeLinkRef = React.useRef();

  React.useEffect(() => {
    placeNameRef.current.value = "";
    placeLinkRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
        name: placeNameRef.current.value, 
        link: placeLinkRef.current.value
    })
  }

  return(
    <PopupWithForm title="Новое место" buttonName="Сохранить" name="place-form" buttonText={props.buttonText} isOpen={props.isOpen} onClose={props.onClose} handleSubmit={handleSubmit}>
    <input 
      className="popup__input popup__input_type_place-name"
      type="text"
      name="name"
      id="place"
      placeholder="Название"
      minLength="2"
      maxLength="30"
      required
      ref={placeNameRef}/>
      <span className="popup__error" id="place-error"></span>
      <input 
      className="popup__input popup__input_type_place-url"
      type="url"
      name="link"
      id="link"
      placeholder="Ссылка на картинку"
      required
      ref={placeLinkRef}/>
      <span className="popup__error" id="link-error"></span>
  </PopupWithForm>
  )
}

export default AddPlacePopup;