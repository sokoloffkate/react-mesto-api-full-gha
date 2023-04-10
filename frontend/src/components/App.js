import { CurrentUserContext } from "contexts/CurrentUserContext";
import React, { useEffect, useState } from "react";
import { api } from "utils/Api";
import { AddPlacePopup } from "./AddPlacePopup";
import { DeleteCardPopup } from "./DeleteCardPopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { EditProfilePopup } from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Main from "./Main";
import { Route, Switch } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState({ isOpen: false, card: {} });
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, card: {} });
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
   
  useEffect(() => {
    api
      .getUserProfile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка - ${err}`);
      });
  }, []);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка - ${err}`);
      });
  }, []);

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
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
  };

  const handleCardClick = (card) => {
    setSelectedCard({ isOpen: true, card: card });
  };

  const handleUpdateUser = ({ name, job }) => {
    api
      .updateUserProfile({ name, job })
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
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка - ${err}`));
  };

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Switch>
          <Route path="/sigh-in">
            <Login />
          </Route>

          <ProtectedRoute
            path="/"
            loggeIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onDeleteCard={handleDeleteClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            component={Main}
          />

         <Footer />

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
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
