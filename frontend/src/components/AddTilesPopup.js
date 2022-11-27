import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
function AddTilesPopup({ onAddPlace, isOpened, onRenderLoading, onClose }) {
    const { values, handleChange, errors, isValid, resetForm } =
        useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(values.name, values.link);
    }

    React.useEffect(() => {
        resetForm(
            { name: "", link: "" },
            { name: "", link: "" },
            { name: true, link: true }
        );
    }, [isOpened]);

    return (
        <PopupWithForm
            title="Новое место"
            name="tiles"
            buttonText={onRenderLoading ? "Сохранение..." : "Сохранить"}
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonState={
                isValid.name && isValid.link && values.name && values.link
            }
        >
            <input
                type="text"
                className={
                    isValid.name
                        ? "popup__input"
                        : "popup__input popup__input_active"
                }
                id="place-name-popup__input"
                name="name"
                value={values.name ? values.name : ""}
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                onChange={handleChange}
            />
            <span
                className="popup__input-error"
                id="place-name-popup__input-error"
            >
                {errors.name}
            </span>
            <input
                type="url"
                className={
                    isValid.link
                        ? "popup__input"
                        : "popup__input popup__input_active"
                }
                id="place-link-popup__input"
                name="link"
                value={values.link ? values.link : ""}
                placeholder="Ссылка на картинку"
                required
                onChange={handleChange}
            />
            <span
                className="popup__input-error"
                id="place-link-popup__input-error"
            >
                {errors.link}
            </span>
        </PopupWithForm>
    );
}

export default AddTilesPopup;
