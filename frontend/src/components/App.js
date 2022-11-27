import React from "react";
import { Route, Switch, Link, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithImage from "./PopupWithImage";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddTilesPopup from "./AddTilesPopup";
import SurePopup from "./SurePopup";
import Sign from "./Sign";
import ProtectedRoute from "./ProtectedRoute";
import { api, sign_api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import sorryImage from "../images/ups2.png";
import successImage from "../images/success.png";
import errorImage from "../images/error.png";

function App() {
    const [currentUser, setCurrentUser] = React.useState({
        name: "",
        about: "",
        avatar: "",
        _id: "",
    });
    const [currentUserEmail, setCurrentUserEmail] = React.useState("");
    const [cards, addCards] = React.useState([]);
    const [isProfilePopupOpened, setIsProfilePopupOpened] =
        React.useState(false);
    const [isTilesPopupOpened, setIsTilesPopupOpened] = React.useState(false);
    const [isAvatarPopupOpened, setIsAvatarPopupOpened] = React.useState(false);
    const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({
        name: "",
        link: "",
    });
    const [cardToDelete, setCardToDelete] = React.useState({ _id: "" });
    const [isRenderLoading, setIsRenderLoading] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const history = useHistory();

    const handleEditAvatarClick = () => {
        setIsAvatarPopupOpened(true);
    };

    const handleEditProfileClick = () => {
        setIsProfilePopupOpened(true);
    };

    const handleAddTileClick = () => {
        setIsTilesPopupOpened(true);
    };

    const handleDeleteCardClick = (card) => {
        setCardToDelete(card);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsImagePopupOpened(true);
    };

    const handleUpdateUser = (name, about) => {
        setIsRenderLoading(true);
        api.setUserInfo(name, about)
            .then((values) => {
                setCurrentUser(values);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsRenderLoading(false));
    };

    const handleUpdateAvatar = (avatar) => {
        setIsRenderLoading(true);
        api.setUserAvatar(avatar)
            .then((values) => {
                setCurrentUser(values);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsRenderLoading(false));
    };

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.likeCard(card._id, isLiked)
            .then((newCard) => {
                addCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    };

    const handleCardDelete = () => {
        setIsRenderLoading(true);
        api.deleteCard(cardToDelete._id)
            .then(() => {
                addCards((state) =>
                    state.filter((c) => c._id != cardToDelete._id)
                );
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsRenderLoading(false));
    };

    const handleAddPlaceSubmit = (name, link) => {
        setIsRenderLoading(true);
        api.addNewCard(name, link)
            .then((newCard) => {
                addCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsRenderLoading(false));
    };

    const closeAllPopups = () => {
        setIsAvatarPopupOpened(false);
        setIsProfilePopupOpened(false);
        setIsTilesPopupOpened(false);
        setIsImagePopupOpened(false);
        setCardToDelete({ _id: "" });
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
        setCurrentUserEmail("");
        localStorage.removeItem("token");
        history.push("sign-in");
    };

    const handleSignUp = (password, email) => {
        setIsRenderLoading(true);
        sign_api
            .signUp(password, email)
            .then(() => {
                setIsImagePopupOpened(true);
                setSelectedCard({ name: "", link: successImage });
            })
            .catch((err) => {
                console.log(err);
                setIsImagePopupOpened(true);
                setSelectedCard({ name: "", link: errorImage });
            })
            .finally(() => setIsRenderLoading(false));
    };

    const handleSignIn = (password, email) => {
        setIsRenderLoading(true);
        sign_api
            .signIn(password, email)
            .then((data) => {
                localStorage.setItem("token", data.token);
                setIsLoggedIn(true);
                setCurrentUserEmail(email);
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
                setIsImagePopupOpened(true);
                setSelectedCard({ name: "", link: errorImage });
            })
            .finally(() => setIsRenderLoading(false));
    };

    const handleSignCheck = () => {
        sign_api
            .signCheck(localStorage.getItem("token"))
            .then((data) => {
                setCurrentUserEmail(data.data.email);
                setIsLoggedIn(true);
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
                setIsLoggedIn(false);
                history.push("/sign-in");
            });
    };

    React.useEffect(() => {
        localStorage.getItem("token") &&
            handleSignCheck(localStorage.getItem("token"));
    }, []);

    React.useEffect(() => {
        isLoggedIn &&
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then((values) => {
                    const [initialUser, initialCards] = values;
                    setCurrentUser(initialUser);
                    addCards(initialCards);
                })
                .catch((err) => console.log(err));
    }, [isLoggedIn]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
                    <Header
                        loggedIn={isLoggedIn}
                        onButtonClick={handleSignOut}
                        buttonText="Выйти"
                        email={currentUserEmail}
                    />
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddTile={handleAddTileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCardClick}
                        sorryImage={sorryImage}
                    />
                    <EditProfilePopup
                        isOpened={isProfilePopupOpened}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        onRenderLoading={isRenderLoading}
                    />
                    <AddTilesPopup
                        isOpened={isTilesPopupOpened}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        onRenderLoading={isRenderLoading}
                    />
                    <EditAvatarPopup
                        isOpened={isAvatarPopupOpened}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        onRenderLoading={isRenderLoading}
                    />
                    <SurePopup
                        card={cardToDelete}
                        onClose={closeAllPopups}
                        onDeleteCard={handleCardDelete}
                        onRenderLoading={isRenderLoading}
                    />
                    <PopupWithImage
                        isOpened={isImagePopupOpened}
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                </ProtectedRoute>
                <Route path="/sign-in">
                    <Header
                        loggedIn={isLoggedIn}
                        linkTo="/sign-up"
                        linkText={"Регистрация"}
                    />
                    <Sign
                        name="in"
                        title="Вход"
                        onSubmit={handleSignIn}
                        buttonText={isRenderLoading ? "Вход..." : "Войти"}
                    />
                    <PopupWithImage
                        isOpened={isImagePopupOpened}
                        card={selectedCard}
                        onClose={closeAllPopups}
                        isSystem={true}
                    />
                </Route>
                <Route path="/sign-up">
                    <Header
                        loggedIn={isLoggedIn}
                        linkTo="/sign-in"
                        linkText={"Войти"}
                    />
                    <Sign
                        name="up"
                        title="Регистрация"
                        onSubmit={handleSignUp}
                        buttonText={
                            isRenderLoading
                                ? "Регистрация..."
                                : "Зарегистрироваться"
                        }
                        onRenderLoading={isRenderLoading}
                    >
                        <Link to="/sign-in" className="sign__link">
                            Уже зарегистрированы? Войти
                        </Link>
                    </Sign>
                    <PopupWithImage
                        isOpened={isImagePopupOpened}
                        card={selectedCard}
                        onClose={closeAllPopups}
                        isSystem={true}
                    />
                </Route>
                <Route path="*">
                    {isLoggedIn ? (
                        <Redirect to="/" />
                    ) : (
                        <Redirect to="/sign-in" />
                    )}
                </Route>
            </Switch>
            <Footer />
        </CurrentUserContext.Provider>
    );
}

export default App;
