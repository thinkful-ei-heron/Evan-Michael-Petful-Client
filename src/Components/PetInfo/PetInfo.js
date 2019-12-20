import React, { Component } from 'react';
import ApiService from '../../Services/ApiService';
import PetContext from '../../Context/PetContext';

export default class PetInfo extends Component {
  static contextType = PetContext;

  render() {
    const { pet } = this.props;
    return (
      <div>
        <section>
          <h3>Next pet available for adoption:</h3>
          <fieldset>
            <legend>{pet.name}</legend>
            <img src={pet.imageURL} alt={pet.imageDescription} />
            <p>{pet.imageDescription}</p>
            <li>{pet.sex}</li>
            <li>{pet.age}</li>
            <li>{pet.breed}</li>
            <p>{pet.story}</p>
          </fieldset>
        </section>
      </div>
    );
  }
}
