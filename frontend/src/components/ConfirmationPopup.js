import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.cardId);
  }

  return (
    <PopupWithForm
        title="Вы уверены?"
        buttonName="Да"
        name="delete-confirmation-form"
        buttonText={props.buttonText}
        isOpen={props.isOpen}
        onClose={props.onClose}
        handleSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmationPopup;