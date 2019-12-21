import React, { Component } from 'react';
import PetContext from '../../Context/PetContext';
import './Buttons.css';
import ApiService from '../../Services/ApiService';

export default class Buttons extends Component {
  state = {
    searchForDog: false,
    searchForCat: false,
    searchForBoth: false,
    viewAll: false,
  }
  static contextType = PetContext;

  handleChangeAdoptClass = () => {
    let elementCat = document.getElementById('Button-cat');
    elementCat.classList.remove('Button-cat');
    elementCat.classList.add('hidden');
    let elementDog = document.getElementById('Button-dog');
    elementDog.classList.remove('Button-dog');
    elementDog.classList.add('hidden');
    let elementBoth = document.getElementById('Button-both');
    elementBoth.classList.remove('Button-both');
    elementBoth.classList.add('hidden');
    // let elementAdopt = document.getElementById('Button-adopt');
    // elementAdopt.classList.remove('hidden');
    // elementAdopt.classList.add('Button-adopt');
    this.handleChangeToNextClass();
  };

  handleChangeToNextClass = () => {
    let elementNext = document.getElementById('Button-next');
    elementNext.classList.remove('Button-next');
    elementNext.classList.add('hidden');
    let elementAll = document.getElementById('Button-all');
    elementAll.classList.remove('hidden');
    elementAll.classList.add('Button-all');
    this.setState({
      viewAll: false,
    })
    if (this.state.searchForCat === true) {
      return ApiService.getCat()
      .then(cat => {
        this.context.setPetList([cat]);
      })
      .catch(this.context.setError);
    } else if (this.state.searchForDog === true) {
      return ApiService.getDog()
      .then(dog => {
        this.context.setPetList([dog]);
      })
      .catch(this.context.setError);
    } else if (this.state.searchForBoth === true) {
      return ApiService.getBoth().then(this.context.setPetList);
    }
  };

  handleChangeToAllClass = () => {
    let elementNext = document.getElementById('Button-next');
    elementNext.classList.remove('hidden');
    elementNext.classList.add('Button-next');
    let elementAll = document.getElementById('Button-all');
    elementAll.classList.remove('Button-all');
    elementAll.classList.add('hidden');
    this.setState({
      viewAll: true,
    })
    if (this.state.searchForCat === true) {
      return ApiService.getCats()
      .then(cat => {
        this.context.setPetList(cat);
      })
      .catch(this.context.setError);
    } else if (this.state.searchForDog === true) {
      return ApiService.getDogs()
      .then(dog => {
        this.context.setPetList(dog);
      })
      .catch(this.context.setError);
    } else if (this.state.searchForBoth === true) {
      return ApiService.getBothAll()
        .then(data => {
          this.context.setPetList([...data[0], ...data[1]])
        });
    }
  };

  handleClickWantCat = () => {
    this.context.setInQueue();
    this.handleChangeAdoptClass();
    this.setState({ searchForCat: true })
    ApiService.postUser(true, false)
    ApiService.getCat()
      .then(cat => {
        this.context.setPetList([cat]);
      })
      .catch(this.context.setError);
    setInterval(() => {
      console.log(this.context.userList)
      if(this.state.viewAll === false) {
        ApiService.getCat()
          .then(cat => {
            this.context.setPetList([cat]);
          })
        ApiService.getUsers()
          .then(user => {
            this.context.setUserList(user)
            if(user[0].name === 'user') {
              this.props.setAdoption()
            }
          })
          .catch(this.context.setError)
      } else if (this.state.viewAll === true) {
        ApiService.getCats()
          .then(cats => {
            this.context.setPetList(cats);
          })
        ApiService.getUsers()
          .then(user => {
            this.context.setUserList(user)
          })
          .catch(this.context.setError)
        }
      }, 3000)
  };

  handleClickWantDog = () => {
    this.context.setInQueue();
    this.handleChangeAdoptClass();
    this.setState({ searchForDog: true })
    ApiService.postUser(false, true)
    ApiService.getDog()
      .then(dog => {
        this.context.setPetList([dog]);
      })
      .catch(this.context.setError);
    setInterval(() => {
      if(this.state.viewAll === false) {
        ApiService.getDog()
          .then(dog => {
            this.context.setPetList([dog]);
          })
        ApiService.getUsers()
          .then(user => {
            this.context.setUserList(user)
          })
          .catch(this.context.setError)
      } else if (this.state.viewAll === true) {
        ApiService.getDogs()
          .then(dogs => {
            this.context.setPetList(dogs);
          })
        ApiService.getUsers()
          .then(user => {
            this.context.setUserList(user)
          })
          .catch(this.context.setError)
        }
      }, 3000)
  };

  handleClickWantBoth = () => {
    this.context.setInQueue();
    this.handleChangeAdoptClass();
    this.setState({ searchForBoth: true })
    ApiService.postUser(true, true)
    ApiService.getBoth().then(this.context.setPetList);
    setInterval(() => {
      ApiService.getBoth()
      .then(both => {
        this.context.setPetList([both]);
      })
      ApiService.getUsers()
        .then(user => {
          this.context.setUserList(user)
        })
      .catch(this.context.setError)
    }, 3000)
  };

  handleClickAdopt = () => {
    this.setState({ 
      inQueue: false, 
      viewAll: false
    });
    if(this.state.searchForDog === true) {
      return ApiService.adoptDog()
    } else if (this.state.searchForCat === true) {
      return ApiService.adoptCat()
    } else if (this.state.searchForBoth === true) {
      return ApiService.adoptBoth()
    }
  };

  render() {
    // console.log(this.context);
    // console.log(this.context.userList);
    return (
      <section className="Button-section">
        <button
          className="Button-cat"
          id="Button-cat"
          onClick={this.handleClickWantCat}
        >
          I want a cat!
        </button>
        <button
          className="Button-dog"
          id="Button-dog"
          onClick={this.handleClickWantDog}
        >
          I want a dog!
        </button>
        <button
          className="Button-both"
          id="Button-both"
          onClick={this.handleClickWantBoth}
        >
          I want both!
        </button>
        <button
          className="hidden"
          id="Button-all"
          onClick={this.handleChangeToAllClass}
        >
          See all available pets for adoption!
        </button>
        <button
          className="hidden"
          id="Button-next"
          onClick={this.handleChangeToNextClass}
        >
          Only see the next available pet!
        </button>
      </section>
    );
  }
}
