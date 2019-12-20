import React, { Component } from 'react';
import './Buttons.css'

export default class Buttons extends Component {

  handleClick() {

  }

  render() {
    return (
      <section className='Button-section'>
        <button className='Button-cat'>
          I want a cat!
        </button>
        <button className='Button-dog'>
          I want a dog!
        </button>
        <button className='Button-both'>
          I want both!
        </button>
        <button className='hidden'>
          Adopt your pet!
        </button>
      </section>
    )
  }
};