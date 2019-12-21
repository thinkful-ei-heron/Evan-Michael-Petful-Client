import React, { Component } from 'react';
import Description from '../Description/Description';
import Buttons from '../Buttons/Buttons';
import PetInfo from '../PetInfo/PetInfo';
import Header from '../Header/Header';
import PetContext from '../../Context/PetContext';
import './App.css';

export default class App extends Component {
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
        <Buttons />
      </div>
    );
  }
}
