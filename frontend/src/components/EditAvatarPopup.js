import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
        avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm title="Обновить аватар" buttonName="Сохранить" name="avatar-form" buttonText={props.buttonText} isOpen={props.isOpen} onClose={props.onClose} handleSubmit={handleSubmit}>
    <input 
        className="popup__input popup__input_type_avatar-link"
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}/>
        <span className="popup__error" id="avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
