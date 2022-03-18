import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
        name,
        about: description,
      });
  }

  function onInputNameChange(e) {
    setName(e.target.value);
  }

  function onInputDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
<PopupWithForm title="Редактировать профиль" buttonName="Сохранить" name="profile-form" buttonText={props.buttonText} isOpen={props.isOpen} onClose={props.onClose} handleSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_name"
        value={`${name}`}
        type="text"
        name="name"
        id="name"
        placeholder="Имя" 
        minLength="2"
        maxLength="40"
        required
        onChange={onInputNameChange}/>
        <span className="popup__error" id="name-error"></span>
        <input 
        className="popup__input popup__input_type_description"
        value={`${description}`}
        type="text"
        name="about"
        id="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        onChange={onInputDescriptionChange}/>
        <span className="popup__error" id="about-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;