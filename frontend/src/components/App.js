import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';
import api from '../utils/Api';
import * as auth from '../utils/Auth';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import ConfirmationPopup from './ConfirmationPopup';
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import MobileMenu from './MobileMenu';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import Footer from './Footer'
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [infoToolTipData, setInfoToolTipData] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isDataSet, setIsDataSet] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isButtonText, setIsButtonText] = React.useState('')
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deleteCard, setDeleteCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({
  name: '',
  about: '',
  _id: '',});
  const [userData, setUserData] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const jwt = localStorage.getItem('jwt');

  React.useEffect(() => {
    tokenCheck('/');
  }, []);

  const history = useHistory();
  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);

  // React.useEffect(() => {
  //   if (loggedIn) {
  //   api
  //     .getAllData(token)
  //     .then(([user, cards]) => {
  //       setCards(cards.cards.reverse());
  //       setCurrentUser(user);
  //       setUserData({ email: user.email });
  //     })
  //     .catch((err) => console.log(err))
  //   }
  // }, [loggedIn, token]);

  React.useEffect(() => {
    if (loggedIn) {
    api.getUserInfo(jwt)
      .then(res => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
    api.getCards(jwt)
      .then(res => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn]);

  const toggleMenu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };
  
  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setIsDataSet(true);
        history.push('/sign-in');
        setInfoToolTipData({
          icon: true,
          title: 'Вы успешно зарегистрировались!',
        });
        handleInfoToolTip();
      })
      .catch(() => {
        setIsDataSet(false);
        setInfoToolTipData({
          icon: false,
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        handleInfoToolTip();
      })
      .finally(() => {
        setIsDataSet(false);
      });
  };
  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setUserData({ email: email });
          setLoggedIn(true);
          setIsMenuOpen(false);
          history.push('/');
        }
      })
      .catch(() => {
        setInfoToolTipData({
          icon: false,
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        handleInfoToolTip();
      });
  };

  const handleLogout = () => {
        localStorage.removeItem('jwt');
        setUserData({ email: '' });
        setLoggedIn(false);
        history.push('/sign-in');
  };

  const tokenCheck = (path) => {
    if (!loggedIn && localStorage.getItem('jwt')) {
    const jwt = localStorage.getItem('jwt');
      auth
        .checkToken(jwt)
        .then((res) => {
        if (res) {
          setUserData({ email: res.email });
          setLoggedIn(true);
          history.push(path);
        }
      })
        .catch((err) => {
          console.log(err);
        });
      }
  }

  const handleUpdateUser = (user) => {
    setIsButtonText('Сохранение...')
    api
      .setUserInfo(user, jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateAvatar = (avatar) => {
    setIsButtonText('Сохранение...')
    api
      .setAvatar(avatar, jwt)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api
      .changeCardLikeStatus(card.cardId, isLiked, jwt)
      .then((res) => {
        const { data } = res;
        setCards((cards) => cards.map((c) => (c._id === card.cardId ? data : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardDelete = () => {
    setIsButtonText('Удаление...')
    api
      .setDelete(deleteCard.cardId, jwt)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deleteCard.cardId));
        closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
    }

  const handleAddPlaceSubmit = (card) => {
    setIsButtonText('Сохранение...')
    api
      .setCard(card, jwt)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleInfoToolTip = () => {
    setIsInfoToolTipOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleDeleteCardClick = (card) => {
    setIsConfirmationPopupOpen(true);
    setDeleteCard(card);
}

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({});
    setIsButtonText('');
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      {loggedIn && (
        <MobileMenu email={userData.email} handleLogout={handleLogout} isMenuOpen={isMenuOpen} />
      )}

      <Header
      email={userData.email}
      toggleMenu={toggleMenu}
      isMenuOpen={isMenuOpen}
      handleLogout={handleLogout}/>

      <Switch>
        <ProtectedRoute
        component={Main}
        exact path="/"
        loggedIn={loggedIn}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteCardClick}
        cards={cards}
        />

        <Route path="/sign-up">
          <Register handleRegister={handleRegister} isDataSet={isDataSet} />
        </Route>
        
        <Route path="/sign-in">
          <Login handleLogin={handleLogin} />
        </Route>

        <Route>{loggedIn ? <Redirect to='/' /> : <Redirect to="/sign-in" />}</Route>
      </Switch>

      <Footer/>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText={isButtonText}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText={isButtonText}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText={isButtonText}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        buttonText={isButtonText}
        onDeleteCard={handleCardDelete}
        onClose={closeAllPopups}
      />

      <InfoToolTip
        isOpen={isInfoToolTipOpen}
        title={infoToolTipData.title}
        icon={infoToolTipData.icon}
        onClose={closeAllPopups}
      />

      <ImagePopup card={selectedCard !== null && selectedCard} onClose={closeAllPopups}/>
    </div>
 </CurrentUserContext.Provider>
  );
}

export default App;
