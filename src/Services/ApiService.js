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
    return Promise.all(URLs.map(url => fetch(url))).then(responses =>
      Promise.all(
        responses.map(res =>
          !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
        )
      )
    );
  },
  getBothAll() {
    const URLs = [`${config.API_ENDPOINT}/cat/all`, `${config.API_ENDPOINT}/dog/all`];
    return Promise.all(URLs.map(url => fetch(url))).then(responses =>
      Promise.all(
        responses.map(res =>
          !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
        )
      )
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
    return fetch(`${config.API_ENDPOINT}/cat`, {
      method: 'DELETE'
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : ''));
  },
  adoptDog() {
    return fetch(`${config.API_ENDPOINT}/dog`, {
      method: 'DELETE'
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : ''));
  },
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
  }
};

export default ApiService;
