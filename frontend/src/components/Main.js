// @ts-nocheck
import { CurrentUserContext } from "contexts/CurrentUserContext";
import React, { useContext } from "react";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onDeleteCard,
  onCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;
      
  return (
    <main className="content">
      <section className="profile">
        <img
          src={avatar}
          className="profile__avatar"
          alt="Кусто"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <h1 className="profile__title">{name}</h1>
          <p className="profile__subtitle">{about}</p>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          />
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements-grid">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onDeleteCard={onDeleteCard}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
