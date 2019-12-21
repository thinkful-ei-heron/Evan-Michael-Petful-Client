import React, { Component } from 'react';
// import ApiService from '../../Services/ApiService';
import PetContext from '../../Context/PetContext';
import './PetInfo.css';

export default class PetInfo extends Component {
  static contextType = PetContext;

  render() {
    const { pet } = this.props;
    return (
      <div>
        <section>
          <fieldset className='pet-fieldset'>
            <legend className='pet-name'>
              <h3 className='pet-name-legend'>{pet.name}</h3>
            </legend>
            <img className='pet-image'src={pet.imageURL} alt={pet.imageDescription} />
            <p>"{pet.imageDescription}"</p>
            <li>Gender: {pet.sex}</li>
            <li>Age: {pet.age}</li>
            <li>Breed: {pet.breed}</li>
            <p>{pet.story}</p>
          </fieldset>
        </section>
      </div>
    );
  }
}
