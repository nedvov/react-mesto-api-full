import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import Card from "./Card";

function Main({
    onEditProfile,
    onAddTile,
    onEditAvatar,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
    sorryImage,
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const cardsElements = cards.map((card) => (
        <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            sorryImage={sorryImage}
        />
    ));

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar">
                    <img
                        className="profile__avatar-image"
                        alt="Ваш аватар"
                        src={currentUser.avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = sorryImage;
                        }}
                    />
                    <button
                        className="profile__avatar-edit-button"
                        type="button"
                        onClick={onEditAvatar}
                    ></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__author-name">{currentUser.name}</h1>
                    <button
                        className="profile__edit-button"
                        type="button"
                        onClick={onEditProfile}
                    ></button>
                    <p className="profile__author-job">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    onClick={onAddTile}
                ></button>
            </section>
            <section className="tiles">{cardsElements}</section>
        </main>
    );
}

export default Main;
