import React, { Component } from 'react';
import Description from '../Description/Description';
import Buttons from '../Buttons/Buttons';
import PetInfo from '../PetInfo/PetInfo';
import Header from '../Header/Header';
import PetContext from '../../Context/PetContext';
import './App.css';

export default class App extends Component {
  static contextType = PetContext;

  renderCatInfo() {
    const cats = this.context.pets.catList;
    if (this.context.viewAll) {
      return (
        <>
          {' '}
          {cats.map((pet, idx) => (
            <PetInfo key={pet} pet={pet} position={idx} type="cat" />
          ))}
        </>
      );
    } else {
      return <PetInfo key={cats[0]} pet={cats[0]} position={0} type="cat" />;
    }
  }

  renderdogInfo() {
    const dogs = this.context.pets.dogList;
    if (this.context.viewAll) {
      return (
        <>
          {' '}
          {dogs.map((pet, idx) => (
            <PetInfo key={pet} pet={pet} position={idx} type="dog" />
          ))}
        </>
      );
    } else {
      return <PetInfo key={dogs[0]} pet={dogs[0]} position={0} type="dog" />;
    }
  }

  renderPetInfo() {
    return (
      <>
        {this.context.pets.catList.length > 0 && this.renderCatInfo()}
        {this.context.pets.dogList.length > 0 && this.renderDogInfo()}
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
