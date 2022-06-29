class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  getAppInfo(jwt) {
    return Promise.all([this.getUserInfo(jwt), this.getInitialCards(jwt)])
  }

  getUserInfo(jwt) {
    return fetch(`${this._baseUrl}users/me`, { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    } })
      .then(this._checkResponse);
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar })
    })
      .then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.description })
    })
      .then(this._checkResponse);
  }

  getInitialCards(jwt) {
    return fetch(`${this._baseUrl}cards`, { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    } })
      .then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: data.name, link: data.link })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  updateCardLike(id, liked) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: liked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.ilya120.nomoreparties.sbs/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  }
});

export { api }
