import React, { Component } from 'react';
import PetContext from '../../Context/PetContext';
import './Buttons.css';
import ApiService from '../../Services/ApiService';
import {produceNewPetList}from '../../Utilities/PetUtil'

export default class Buttons extends Component {
  state = {
    searchForDog: false,
    searchForCat: false,
    searchForBoth: false,
    viewAll: false,
    interval: null,
    showAdoptButton: false,
    displayAdoption: false
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
    this.startInterval();
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
    }, () => this.updatePets());
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
    }, () => this.updatePets())
  };

  handleClickWantCat = () => {
    if (this.context.inQueue) return;
    this.context.setInQueue();
    this.handleChangeAdoptClass();
    this.setState({ searchForCat: true }, () => this.updatePets());
    ApiService.postUser(true, false)
  };

  handleClickWantDog = () => {
    if (this.context.inQueue) return;
    this.context.setInQueue();
    this.handleChangeAdoptClass();
    this.setState({ searchForDog: true }, () => this.updatePets());
    ApiService.postUser(false, true)
  };

  handleClickWantBoth = () => {
    if (this.context.inQueue) return;
    this.context.setInQueue();
    this.handleChangeAdoptClass();
    this.setState({ searchForBoth: true }, () => this.updatePets());
    ApiService.postUser(true, true)
    
  };
  startInterval = () => {
    if (this.state.interval) return;
    const interval = setInterval(() => {
      this.updatePets();
      this.updateUsers();
      this.checkIfUpNext();
    }, 3000)
    this.setState({interval})
  }
  endInterval = () => {
    if (this.state.interval === null) return;
    clearInterval(this.state.interval);
    this.setState({interval: null})
  }
  handleClickAdopt = () => {
    this.setState({ 
      inQueue: false, 
      viewAll: false,
      showAdoptButton: false,
      displayAdoption: true
    });
    this.props.setAdoption();
    if(this.state.searchForDog === true) {
      return ApiService.adoptDog()
    } else if (this.state.searchForCat === true) {
      return ApiService.adoptCat()
    } else if (this.state.searchForBoth === true) {
      return ApiService.adoptBoth()
    }
  };

  checkIfUpNext = () => {
    if (this.context.userList.length > 0 && this.context.userList[0].name === 'user') {
      this.setState({showAdoptButton: true})
      this.endInterval();
      const adoptButton = document.getElementById('adopt-button')
      
      adoptButton.classList.remove('hidden');
      adoptButton.classList.add('Button-adopt')
    }
  }

  //functions for updating state
  updatePets = () => {
    if (this.state.searchForCat) {
      if (this.state.viewAll) {
        return ApiService.getCats()
        .then(cats => {
          this.context.setPetList(produceNewPetList('cat', cats))
        })
        .catch(this.context.setError);
      } else {
        return ApiService.getCat().then(cat => this.context.setPetList(produceNewPetList('cat', cat))).catch(this.context.setError);
      }
    }
    if (this.state.searchForDog) {
      if (this.state.viewAll) {
        return ApiService.getDogs()
        .then(dogs => {
          this.context.setPetList(produceNewPetList('dog', dogs))
        })
        .catch(this.context.setError);
      } else {
        return ApiService.getDog().then(dog => this.context.setPetList(produceNewPetList('dog', dog))).catch(this.context.setError);
      }
    }
    if (this.state.searchForBoth) {
      if (this.state.viewAll) {
        return ApiService.getBothAll()
        .then(both => {
          this.context.setPetList(produceNewPetList('both', both))
        })
        .catch(this.context.setError);
      } else {
        return ApiService.getBoth().then(both => this.context.setPetList(produceNewPetList('both', both))).catch(this.context.setError);
      }
    }
    this.props.forceAppUpdate();
  }

  updateUsers = () => {
    ApiService.getUsers()
        .then(user => {
          this.context.setUserList(user)
        })
      .catch(this.context.setError)
  }

  render() {
    // console.log(this.context);
    // console.log(this.context.userList);
    return (
      <>
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
        <button className="hidden" id="adopt-button" onClick={this.handleClickAdopt}> 
          Adopt a pet!
        </button>
        
      </section>
      </>
    );
  }
}
