import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({
    onUpdateUser,
    isOpened,
    onRenderLoading,
    onClose,
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid, resetForm } =
        useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(values.name, values.about);
    }

    React.useEffect(() => {
        resetForm(
            { name: currentUser.name, about: currentUser.about },
            { name: "", about: "" },
            { name: true, about: true }
        );
    }, [currentUser, isOpened]);

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            buttonText={onRenderLoading ? "Сохранение..." : "Сохранить"}
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonState={isValid.name && isValid.about}
        >
            <input
                type="text"
                className={
                    isValid.name
                        ? "popup__input"
                        : "popup__input popup__input_active"
                }
                id="author-name-popup__input"
                name="name"
                value={values.name ? values.name : ""}
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChange}
            />
            <span
                className="popup__input-error"
                id="author-name-popup__input-error"
            >
                {errors.name}
            </span>
            <input
                type="text"
                className={
                    isValid.about
                        ? "popup__input"
                        : "popup__input popup__input_active"
                }
                id="author-job-popup__input"
                name="about"
                value={values.about ? values.about : ""}
                placeholder="Деятельность"
                required
                minLength="2"
                maxLength="200"
                onChange={handleChange}
            />
            <span
                className="popup__input-error"
                id="author-job-popup__input-error"
            >
                {errors.about}
            </span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
