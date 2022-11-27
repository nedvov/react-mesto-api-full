import PopupWithForm from "./PopupWithForm";
import React from "react";

function SurePopup({ onRenderLoading, card, onClose, onDeleteCard }) {
    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard();
    }

    return (
        <PopupWithForm
            title="Вы уверены?"
            name="sure"
            buttonText={onRenderLoading ? "Сохранение..." : "Да"}
            isOpened={card._id ? true : false}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonState={true}
        />
    );
}

export default SurePopup;
