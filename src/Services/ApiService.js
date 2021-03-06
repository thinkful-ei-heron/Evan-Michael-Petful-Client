import config from '../config';

const ApiService = {
  getCat() {
    return fetch(`${config.API_ENDPOINT}/cat`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getDog() {
    return fetch(`${config.API_ENDPOINT}/dog`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getBoth() {
    const URLs = [`${config.API_ENDPOINT}/cat`, `${config.API_ENDPOINT}/dog`];
    return Promise.all(URLs.map(url => fetch(url))).then(responses =>{
      //console.log(responses)
      return Promise.all(
        responses.map(res =>
          !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
        )
      )}
    );
  },
  getBothAll() {
    const URLs = [`${config.API_ENDPOINT}/cat/all`, `${config.API_ENDPOINT}/dog/all`];
    return Promise.all(URLs.map(url => fetch(url))).then(responses =>
{     // console.log(responses)
      return Promise.all(
        responses.map(res =>
          !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
        )
      )}
    );
  },
  getCats() {
    return fetch(`${config.API_ENDPOINT}/cat/all`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getDogs() {
    return fetch(`${config.API_ENDPOINT}/dog/all`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  adoptBoth() {
    this.clearUser();
    const URLs = [`${config.API_ENDPOINT}/cat`, `${config.API_ENDPOINT}/dog`];
    return Promise.all(URLs.map(url => fetch(url, {method: 'DELETE'}))).then(responses =>
      Promise.all(
        responses.map(res =>
          !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
        )
      )
    );
  },
  adoptCat() {
    this.clearUser();
    return fetch(`${config.API_ENDPOINT}/cat`, {
      method: 'DELETE'
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : ''));
  },
  adoptDog() {
    this.clearUser();
    return fetch(`${config.API_ENDPOINT}/dog`, {
      method: 'DELETE'
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : ''));
  },
  clearUser() {
    return fetch(`${config.API_ENDPOINT}/user`, {
      method: 'DELETE'
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : ''));  },
  getUsers() {
    return fetch(`${config.API_ENDPOINT}/user/all`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postUser(cat, dog) {
    return fetch(`${config.API_ENDPOINT}/user`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: 'user',
        cat: cat,
        dog: dog
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
    );
  },
  testCleanupUser() {
    const users = this.getUsers();
    let idx = users.findIndex(user => user.name === 'user')
    while (idx >= 0) {
      idx--;
      this.clearUser();
    }
  }
};

export default ApiService;
