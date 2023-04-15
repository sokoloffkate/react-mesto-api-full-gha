import { CurrentUserContext } from "contexts/CurrentUserContext";
import React, { useEffect, useState, useCallback } from "react";
import { api } from "utils/Api";
import { AddPlacePopup } from "./AddPlacePopup";
import { DeleteCardPopup } from "./DeleteCardPopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { EditProfilePopup } from "./EditProfilePopup";
import { InfoTooltip } from "./InfoTooltip";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/Auth";
import Success from '../images/Success.svg';
import Failure from "../images/Failure.svg";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRegister, setUserRegister] = useState(false);
  const history = useHistory();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState({ isOpen: false, card: {} });
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, card: {} });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handleInfoPopupClick = () => {
    setInfoPopupOpen(!isInfoPopupOpen);
  };

  const handleAuthenticate = useCallback(
    (email, password) => {
      auth
        .login(email, password)
        .then((data) => {
          setLoggedIn(true);
          setUserEmail(email);
          localStorage.setItem("jwt", data.token)
        })
        .catch((err) => {
          setUserRegister(false);
          handleInfoPopupClick();
          console.log(`Ошибка - ${err}`);
        });
    },
    [handleInfoPopupClick]
  );

  const handleRegister = useCallback(
    (email, password) => {
      auth
        .register(email, password)
        .then((data) => {
          setUserRegister(true);
          handleInfoPopupClick();
          setUserEmail(data.email);
        })
        .catch((err) => {
          setUserRegister(false);
          handleInfoPopupClick();
          console.log(`Ошибка - ${err}`);
        })
        .finally(() => history.push("/signin"));
    },
    [history, handleInfoPopupClick]
  );

  const handleTokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
     if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          setLoggedIn(true);
        })
        .catch((err) => console.log(`Ошибка - ${err}`));
    }
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  const handleLogOut = useCallback(() => {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("jwt");
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserProfile()
        .then((userData) => {
          console.log(userData);
          setCurrentUser(userData);
       })
        .catch((err) => {
          console.log(`Ошибка - ${err}`);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка - ${err}`);
        });
    }
  }, [loggedIn]);

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      // @ts-ignore
      .then((y) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка - ${err}`));
  };

  const handleCardLike = (cardId, isLiked) => {
    api
      .switchCardLikes(cardId, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === cardId ? newCard : c)));
      })
      .catch((err) => console.log(`Ошибка - ${err}`));
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleDeleteClick = (card) => {
    setDeleteCard({ isOpen: true, card: card });
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCard({ isOpen: false, card: {} });
    setSelectedCard({ isOpen: false, card: {} });
    setInfoPopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard({ isOpen: true, card: card });
  };

  const handleUpdateUser = ({ name, job }) => {
    api
      .updateUserProfile({ name: name, job: job })
      .then((newDataUser) => {
        setCurrentUser({
          ...newDataUser,
          name: newDataUser.name,
          job: newDataUser.about,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка - ${err}`));
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .changeAvatar(avatar)
      .then((user) => {
        setCurrentUser({ ...user, avatar: user.avatar });
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка - ${err}`));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addNewCard({ name: name, link: link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка - ${err}`));
  };

  console.log(currentUser);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header email={userEmail} onLogOut={handleLogOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onDeleteCard={handleDeleteClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
          />
          <Route path="/signin">
            <Login isLoggedIn={loggedIn} onLogin={handleAuthenticate} />
          </Route>

          <Route path="/signup">
            <Register isLoggedIn={loggedIn} onRegister={handleRegister} />
          </Route>

          <Route>
            {loggedIn} ? <Redirect to="/" /> : <Redirect to="/signin" />
          </Route>
        </Switch>
        <Footer />
      </div>

      <InfoTooltip
        name={"popup_info"}
        isOpen={isInfoPopupOpen}
        onClose={closeAllPopups}
        images={userRegister ? Success : Failure}
        text={
          userRegister
            ? "Вы успешно зарегистрировались"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }
      ></InfoTooltip>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      ></EditAvatarPopup>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      ></EditProfilePopup>

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddNewPlace={handleAddPlaceSubmit}
      ></AddPlacePopup>

      <DeleteCardPopup
        isOpen={deleteCard.isOpen}
        card={deleteCard}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
      ></DeleteCardPopup>

      <ImagePopup
        name="popup_zoom-in_image"
        card={selectedCard}
        isOpen={selectedCard.isOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
