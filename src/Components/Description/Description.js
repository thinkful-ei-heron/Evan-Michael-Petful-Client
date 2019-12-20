import React from 'react';
import './Description.css';

function description() {
  return (
      <section className='Site-description'>
        <fieldset>
          <legend>
            <h3 className='Description-legend'>The Adoption Process:</h3>
          </legend>
            <p>
              Here at FIFO we value matching every pet to a person and every person to a pet.
              Click the button below to enter the queue to a adopt a pet of your own.
              See what other pets are being adopted while you wait.
              When you reach the front of the queue, the 'Adopt' button will change colors,
              allowing you to adopt your lucky, furry, friend!
            </p>
        </fieldset>
      </section>
  );
}

export default description;
