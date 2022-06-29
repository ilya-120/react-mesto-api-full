class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
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

  setAvatar(data, jwt) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({ avatar: data.avatar })
    })
      .then(this._checkResponse);
  }

  setUserInfo(data, jwt) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
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

  postNewCard(data, jwt) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({ name: data.name, link: data.link })
    })
      .then(this._checkResponse);
  }

  deleteCard(id, jwt) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    })
      .then(this._checkResponse);
  }

  updateCardLike(id, liked, jwt) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: liked ? 'PUT' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.nexus.moscow/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  }
});

export { api }
