import { Link } from "react-router-dom";
import React from "react";

function Header({
    loggedIn,
    onButtonClick,
    buttonText,
    linkTo,
    linkText,
    email,
}) {
    const [isBurgerOpened, setIsBurgerOpened] = React.useState(false);

    function clickBurger() {
        setIsBurgerOpened((isBurgerOpened) => (!isBurgerOpened));
    }

    return (
        <header className="header">
            {isBurgerOpened && (
                <div className={"header__info header__info_hidden-desktop"}>
                    <p className="header__email">{email}</p>
                    <button
                        type="button"
                        className="header__button"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </button>
                    <div className="header__line header__line_no-margin" />
                </div>
            )}
            <div className="header__main">
                <div className="header__logo" />
                {loggedIn ? (
                    <>
                        <button
                            type="button"
                            className={
                                isBurgerOpened
                                    ? "header__burger header__burger_opened"
                                    : "header__burger"
                            }
                            onClick={clickBurger}
                        />
                        <div className="header__info header__info_hidden-mobile">
                            <p className="header__email">{email}</p>
                            <button
                                type="button"
                                className="header__button"
                                onClick={onButtonClick}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </>
                ) : (
                    <Link to={linkTo} className="header__link">
                        {linkText}
                    </Link>
                )}
            </div>
            <div className="header__line" />
        </header>
    );
}

export default Header;
