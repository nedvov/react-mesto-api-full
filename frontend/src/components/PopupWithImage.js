import React from "react";

function PopupWithImage({ isOpened, onClose, card, isSystem }) {
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
            id="image-popup"
            onClick={closeByOuterClick}
        >
            <div className="popup__image-container">
                <button
                    type="reset"
                    className="popup__close-button"
                    id="image-popup__close-button"
                    onClick={onClose}
                ></button>
                <img
                    className={
                        isSystem ? "popup__system-image" : "popup__image"
                    }
                    src={card.link && card.link}
                    alt={card.name && card.name}
                />
                <p className="popup__image-description">{card.name}</p>
            </div>
        </div>
    );
}

export default PopupWithImage;
