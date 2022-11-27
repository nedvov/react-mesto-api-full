import React from "react";

function PopupWithForm({
    isOpened,
    name,
    title,
    onClose,
    onSubmit,
    children,
    buttonText,
    buttonState,
}) {
    const popup = React.useRef();

    function closeByOuterClick(evt) {
        const withinBoundaries = evt.nativeEvent.path.includes(
            popup.current.children[0]
        );
        if (!withinBoundaries) {
            onClose();
        }
    }

    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === "Escape") {
                onClose();
            }
        }

        if (isOpened) {
            document.addEventListener("keydown", closeByEscape);
            return () => {
                document.removeEventListener("keydown", closeByEscape);
            };
        }
    }, [isOpened]);

    return (
        <div
            ref={popup}
            className={isOpened ? "popup popup_opened" : "popup"}
            id={`${name}-popup`}
            onClick={closeByOuterClick}
        >
            <div className="popup__container">
                <button
                    type="reset"
                    className="popup__close-button"
                    id={`${name}-popup__close-button`}
                    onClick={onClose}
                ></button>
                <h2 className="popup__title">{title}</h2>
                <form
                    className="popup__form"
                    id={`${name}-popup__form`}
                    name={`${name}-edit-form`}
                    onSubmit={onSubmit}
                >
                    <fieldset className="popup__inputs">
                        {children}
                        <input
                            type="submit"
                            className="popup__save-button"
                            id={`${name}-popup__save-button`}
                            value={buttonText}
                            disabled={!buttonState}
                        />
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
