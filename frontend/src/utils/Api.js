class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  
    getCards() {
      return fetch(`${this._baseUrl}cards`, {
        headers: this._headers
      })
        .then(this._handleResponse);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}users/me`, {
        headers: this._headers
      })
        .then(this._handleResponse);
    }
  
    getAllData() {
      return Promise.all([this.getCards(), this.getUserInfo()])
    }
  
    setCard(data) {
      return fetch(`${this._baseUrl}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        })
      })
        .then(this._handleResponse);
    }
  
    setUserInfo(data) {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        })
      })
        .then(this._handleResponse);
    }
  
    setAvatar(data) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(this._handleResponse);
    }
  
    setLike(data) {
      return fetch(`${this._baseUrl}cards/likes/${data}`, {
        method: 'PUT',
        headers: this._headers,
      })
        .then(this._handleResponse);
    }
    
    changeCardLikeStatus(data, isLiked) {
      return isLiked ? this.setDislike(data) : this.setLike(data);
    }
  
    setDislike(data) {
      return fetch(`${this._baseUrl}cards/likes/${data}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(this._handleResponse);
    }
  
    setDelete(data) {
      return fetch(`${this._baseUrl}cards/${data}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(this._handleResponse);
  
    }
  }

  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30/',
    headers: {
      authorization: 'd3a63f01-1045-4e1e-b727-d3760ac2c2e8',
      'Content-Type': 'application/json',
    },
  });

export default api;