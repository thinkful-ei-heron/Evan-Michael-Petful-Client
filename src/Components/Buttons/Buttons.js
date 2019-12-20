import React, { Component } from 'react';
import PetContext from '../../Context/PetContext';
import './Buttons.css';
import ApiService from '../../Services/ApiService';

export default class Buttons extends Component {
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
  };

  handleChangeToAllClass = () => {
    let elementNext = document.getElementById('Button-next');
    elementNext.classList.remove('hidden');
    elementNext.classList.add('Button-next');
    let elementAll = document.getElementById('Button-all');
    elementAll.classList.remove('Button-all');
    elementAll.classList.add('hidden');
  };

  handleClickWantCat = () => {
    this.context.setInQueue();
    this.handleChangeAdoptClass();
    ApiService.getCat()
      .then(cat => {
        this.context.setCatList([cat]);
      })
      .catch(this.context.setError);
  };

  handleClickWantDog = () => {
    this.context.setInQueue();
    this.handleChangeAdoptClass();
    ApiService.getDog()
      .then(dog => {
        this.context.setDogList([dog]);
      })
      .catch(this.context.setError);
  };

  handleClickWantBoth = () => {
    this.context.setInQueue();
    this.handleChangeAdoptClass();
    // ApiService.getBoth().then(this.context.setPetList);
    ApiService.getCat()
      .then(cat => {
        this.context.setCatList([cat]);
      })
      .catch(this.context.setError);
    ApiService.getDog()
      .then(dog => {
        this.context.setDogList([dog]);
      })
      .catch(this.context.setError);
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
