import React, { Component } from 'react';
import PetContext from '../../Context/PetContext';
import './PetInfo.css';

export default class PetInfo extends Component {
  static contextType = PetContext;

  petPosition(index, type) {
    if (index === 0) {
      return <h3>Next pet available for adoption:</h3>;
    } else {
      return <h3>Upcoming pet (position in line: {index + 1}): </h3>;
    }
  }

  render() {
    const { pet, position, type } = this.props;
    return (
      <div>
        <section>
          {this.petPosition(position)}
          <fieldset>
            <legend>{pet.name}</legend>
            <img
              className="pet-image"
              src={pet.imageURL}
              alt={pet.imageDescription}
            />
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
