import React, { Component } from 'react';
import PetContext from '../../Context/PetContext';
import './Buttons.css';
import ApiService from '../../Services/ApiService';

export default class Buttons extends Component {
  state = {
    searchForDog: false,
    searchForCat: false,
    searchForBoth: false,
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
    let elementAdopt = document.getElementById('Button-adopt');
    elementAdopt.classList.remove('hidden');
    elementAdopt.classList.add('Button-adopt');
    this.handleChangeToNextClass();
  };

  handleChangeToNextClass = () => {
    let elementNext = document.getElementById('Button-next');
    elementNext.classList.remove('Button-next');
    elementNext.classList.add('hidden');
    let elementAll = document.getElementById('Button-all');
    elementAll.classList.remove('hidden');
    elementAll.classList.add('Button-all');
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
    ApiService.getCat()
      .then(cat => {
        this.context.setPetList([cat]);
      })
      .catch(this.context.setError);
    setInterval(e => {
      ApiService.adoptCat()
      .then(ApiService.getCat()
      .then(cat => {
        this.context.setPetList([cat]);
      })
      .catch(this.context.setError))
    }, 8000)
  };

  handleClickWantDog = () => {
    this.context.setInQueue();
    this.handleChangeAdoptClass();
    this.setState({ searchForDog: true })
    ApiService.getDog()
      .then(dog => {
        this.context.setPetList([dog]);
      })
      .catch(this.context.setError);
    setInterval(e => {
      ApiService.adoptDog()
      .then(ApiService.getDog()
      .then(dog => {
        this.context.setPetList([dog]);
      })
      .catch(this.context.setError))
    }, 8000)
  };

  handleClickWantBoth = () => {
    this.context.setInQueue();
    this.handleChangeAdoptClass();
    this.setState({ searchForBoth: true })
    ApiService.getBoth().then(this.context.setPetList);
    setInterval(e => {
      ApiService.adoptCat()
      .then(ApiService.getCat()
      .then(cat => {
        this.context.setPetList([cat]);
      })
      .catch(this.context.setError))
    }, 8000)
  };

  handleClickAdopt = () => {
    this.setState({ inQueue: false });
  };

  render() {
    console.log(this.context);
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
        <button
          className="hidden"
          id="Button-adopt"
          onClick={this.handleClickAdopt}
        >
          Adopt your pet!
        </button>
      </section>
    );
  }
}
