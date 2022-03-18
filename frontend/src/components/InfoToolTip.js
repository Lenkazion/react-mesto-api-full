import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';

function InfoToolTip(props) {
  return (
    <div className={`popup popup_type_input ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container_notification">
        <img className="popup__icon" src={props.icon ? SuccessIcon : ErrorIcon} alt='Иконка' />
        <h2 className="popup__notification">{props.title}</h2>
        <button className="popup__close_notification" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
};

export default InfoToolTip;