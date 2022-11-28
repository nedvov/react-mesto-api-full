class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    #isOK(res) {
        const status = res.ok;
        const statusMessage = res.status;
        return res.json().then((data) => {
            if (!status) {
                return Promise.reject(
                    `Ошибка: ${statusMessage}; ${data.message}`
                );
            }
            return data;
        });
    }

    _doRequest(url, options) {
        return fetch(url, options).then(this.#isOK);
    }

    getInitialCards(token) {
        return this._doRequest(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        });
    }

    getUserInfo(token) {
        return this._doRequest(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        });
    }

    addNewCard(name, link, token) {
        return this._doRequest(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        });
    }

    setUserInfo(name, job, token) {
        return this._doRequest(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                about: job,
            }),
        });
    }

    deleteCard(cardId, token) {
        return this._doRequest(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        });
    }

    likeCard(cardId, isLiked, token) {
        return this._doRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: !isLiked ? "PUT" : "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        });
    }

    setUserAvatar(link, token) {
        return this._doRequest(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: link,
            }),
        });
    }

    signIn(password, email) {
        return this._doRequest(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        });
    }

    signUp(password, email) {
        return this._doRequest(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        });
    }

}

export const api = new Api({
    baseUrl: "https://api.nedvov.mesto.nomoredomains.club",
});
