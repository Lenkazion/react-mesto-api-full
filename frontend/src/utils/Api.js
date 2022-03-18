class Api {
    constructor(baseUrl) {
      this._baseUrl = baseUrl;
    }
  
    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  
    getCards(token) {
      return fetch(`${this._baseUrl}cards`, {
        method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
         }
      })
        .then(this._handleResponse);
    }
  
    getUserInfo(token) {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
         }
      })
        .then(this._handleResponse);
    }
  
    getAllData(token) {
      return Promise.all([this.getCards(token), this.getUserInfo(token)])
    }
  
    setCard(data, token) {
      return fetch(`${this._baseUrl}cards`, {
        method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
         },
          body: JSON.stringify({
          name: data.name,
          link: data.link,
        })
      })
        .then(this._handleResponse);
    }
  
    setUserInfo(data, token) {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
       },
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        })
      })
        .then(this._handleResponse);
    }
  
    setAvatar(data, token) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
       },
        body: JSON.stringify(data)
      })
        .then(this._handleResponse);
    }
  
    setLike(data, token) {
      return fetch(`${this._baseUrl}cards/likes/${data}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
       },
      })
        .then(this._handleResponse);
    }
    
    changeCardLikeStatus(data, isLiked, token) {
      return isLiked ? this.setDislike(data, token) : this.setLike(data, token);
    }
  
    setDislike(data, token) {
      return fetch(`${this._baseUrl}cards/likes/${data}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
       },
      })
        .then(this._handleResponse);
    }
  
    setDelete(data, token) {
      return fetch(`${this._baseUrl}cards/${data}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
       },
      })
        .then(this._handleResponse);
  
    }
  }

  const api = new Api({
    baseUrl: 'https://api.lenkazion.nomoredomains.work/',
  });

export default api;