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

    getInitialCards() {
        return this._doRequest(`${this._baseUrl}/cards`, {
            method: "GET",
            credentials: 'include',
            headers: this._headers,
        });
    }

    getUserInfo() {
        return this._doRequest(`${this._baseUrl}/users/me`, {
            method: "GET",
            credentials: 'include',
            headers: this._headers,
        });
    }

    addNewCard(name, link) {
        return this._doRequest(`${this._baseUrl}/cards`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        });
    }

    setUserInfo(name, job) {
        return this._doRequest(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: job,
            }),
        });
    }

    deleteCard(cardId) {
        return this._doRequest(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
        });
    }

    likeCard(cardId, isLiked) {
        return this._doRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: !isLiked ? "PUT" : "DELETE",
            credentials: 'include',
            headers: this._headers,
        });
    }

    setUserAvatar(link) {
        return this._doRequest(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            }),
        });
    }

    signIn(password, email) {
        return this._doRequest(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        });
    }

    signUp(password, email) {
        return this._doRequest(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        });
    }

    signCheck(token) {
        return this._doRequest(`${this._baseUrl}/users/me`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
    }
}

export const api = new Api({
    baseUrl: "https://api.nedvov.mesto.nomoredomains.club",
    headers: {
        "Content-Type": "application/json",
    },
});

export const sign_api = new Api({
    baseUrl: "https://api.nedvov.mesto.nomoredomains.club",
    headers: {
        "Content-Type": "application/json",
    },
});
