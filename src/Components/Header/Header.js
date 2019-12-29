import React from 'react';
import './Header.css';
import Pets from '../../pets.png';

function Header() {
  return (
    <header className="App-header">
      <h1 className='App-header-title'>FIFO</h1>
      <img src={Pets} alt='all the pets'  className='header-photo'/>
      <h2 className='App-header-slogan'>Pet Adoption Agency</h2>
    </header>
  );
}

export default Header;
