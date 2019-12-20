import React from 'react';

function Buttons() {
  return (
    <section className='Button-section'>
      <button className='hidden'>
        I want a cat!
      </button>
      <button className='hidden'>
        I want a dog!
      </button>
      {/* <button className='hidden'>
        I want a cat or a dog!
      </button> */}
      <button className='hidden'>
         Adopt your pet!
      </button>
    </section>
  );
}

export default Buttons;