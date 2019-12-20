import React from 'react';
import Description from '../Description/Description';
import Buttons from '../Buttons/Buttons';
import QueuePhotos from '../QueuePhotos/QueuePhotos';
import Header from '../Header/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Description />
      <Buttons />
      <QueuePhotos />
    </div>
  );
}

export default App;
