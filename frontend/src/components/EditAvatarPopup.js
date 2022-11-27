import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({
    onUpdateAvatar,
    onRenderLoading,
    isOpened,
    onClose,
}) {
    const { values, handleChange, errors, isValid, resetForm } =
        useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(values.avatar);
    }

    React.useEffect(() => {
        resetForm({ avatar: "" }, { avatar: "" }, { avatar: true });
    }, [isOpened]);

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            buttonText={onRenderLoading ? "Сохранение..." : "Сохранить"}
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonState={values.avatar && isValid.avatar}
        >
            <input
                type="url"
                className={
                    isValid.avatar
                        ? "popup__input"
                        : "popup__input popup__input_active"
                }
                id="avatar-link-popup__input"
                name="avatar"
                value={values.avatar ? values.avatar : ""}
                placeholder="Ссылка на картинку"
                required
                onChange={handleChange}
            />
            <span
                className="popup__input-error"
                id="avatar-link-popup__input-error"
            >
                {errors.avatar}
            </span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
