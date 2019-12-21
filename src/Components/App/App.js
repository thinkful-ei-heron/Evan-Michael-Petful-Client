import React, { Component } from 'react';
import Description from '../Description/Description';
import Buttons from '../Buttons/Buttons';
import PetInfo from '../PetInfo/PetInfo';
import Header from '../Header/Header';
import PetContext from '../../Context/PetContext';
import Congrats from '../Congrats/Congrats';
import './App.css';
import ApiService from '../../Services/ApiService';

export default class App extends Component {

  state = {
    displayAdoption: false
  }

  static contextType = PetContext;

  renderPetInfo() {
    const { petList } = this.context;
    return (
      <>
        {' '}
        {petList.map((pet, index) => (
          <PetInfo key={index} pet={pet} />
        ))}
      </>
    );
  }
//TO DO -- Take the state from Button and drill up to here
  setAdoption = () => {
    this.setState({displayAdoption: true})
    ApiService.adoptCat()
  }

  renderDescription() {
    return <Description />;
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.context.inQueue && this.context.petList.length > 0
          ? this.renderPetInfo()
          : this.renderDescription()}
        <Buttons 
          setAdoption={this.setAdoption}
          displayAdoption={this.state.displayAdoption}/>
        {this.state.displayAdoption === true
          ? <Congrats />
          : ''}
      </div>
    );
  }
}
