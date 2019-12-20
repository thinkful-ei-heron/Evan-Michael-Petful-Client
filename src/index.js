import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import { PetProvider } from './Context/PetContext';

ReactDOM.render(
    <PetProvider>
      <App />
    </PetProvider>
  , document.getElementById('root'));
serviceWorker.unregister();
