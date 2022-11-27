import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, sorryImage, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [imageErrorState, setImageErrorState] = React.useState(false);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    function handleClick() {
        if (imageErrorState) {
            const cardWithError = Object.assign({}, card);
            cardWithError.link = sorryImage;
            onCardClick(cardWithError);
        } else {
            onCardClick(card);
        }
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="tiles__item" id={card._id}>
            <img
                className="tiles__image"
                src={card.link}
                alt={card.name}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = sorryImage;
                    setImageErrorState(true);
                }}
                onClick={handleClick}
            />
            <div className="tiles__place">
                <h2 className="tiles__title">{card.name}</h2>
                <div className="tiles__likes">
                    <button
                        className={
                            isLiked
                                ? "tiles__like tiles__like_active"
                                : "tiles__like"
                        }
                        onClick={handleLikeClick}
                        type="button"
                    ></button>
                    <p className="tiles__like-count">{card.likes.length}</p>
                </div>
            </div>
            {isOwn && (
                <button
                    className="tiles__delete-button"
                    onClick={handleDeleteClick}
                    type="button"
                ></button>
            )}
        </div>
    );
}

export default Card;
