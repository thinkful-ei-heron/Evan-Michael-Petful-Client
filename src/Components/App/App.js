import React, { Component } from 'react';
import Description from '../Description/Description';
import Buttons from '../Buttons/Buttons';
import PetInfo from '../PetInfo/PetInfo';
import Header from '../Header/Header';
import PetContext from '../../Context/PetContext';
import Congrats from '../Congrats/Congrats';
import './App.css';
import ApiService from '../../Services/ApiService';
import {findPossiblePets} from '../../Utilities/PetUtil';

export default class App extends Component {

  state = {
    displayAdoption: false
  }

  static contextType = PetContext;

  renderPetInfo() {
    const { petList, userList } = this.context;
    const {catIndex, dogIndex} = findPossiblePets('user', userList, petList.cats, petList.dogs)

    console.log (petList)
    console.log (userList)

    if(petList.cats.length > 0 && petList.dogs.length > 0) {
      return (<>
      <div className='cat-div'>
      {petList.cats.map((pet, index) => (
          <PetInfo key={'cat'+index} pet={pet} last={userList.length > 0 && index === catIndex}/>
        ))}
      </div>
      <div className='dog-div'>
      {petList.dogs.map((pet, index) => (
          <PetInfo key={'dog'+index} pet={pet} last={userList.length > 0 && index === dogIndex} />
        ))}
      </div>

      </>)
    }
    const pets = petList.cats.length > 0 ? petList.cats : petList.dogs;
    const idx = petList.cats.length > 0 ? catIndex : dogIndex;
    return (
      <>
        {' '}
        {pets.map((pet, index) => (
          <PetInfo key={index} pet={pet} last={userList.length > 0 && index === idx} />
        ))}
      </>
    );
  }
//TO DO -- Take the state from Button and drill up to here
  setAdoption = () => {
    this.setState({displayAdoption: true})
  }

  renderDescription() {
    return <Description />;
  }

  componentDidMount() {
    window.addEventListener('beforeunload', () => { //wouldn't need this with proper persistence but persistence isn't in the spec
      ApiService.testCleanupUser();
    })
  }

  renderUsers = () => {
    const {userList} = this.context;
    const index = userList.findIndex(user => user.name === 'user');
    const list = userList.slice(0, index + 1).map((user, index) =>  <li key={'user'+index}>{user.name === 'user' ? 'You' : user.name} — interested in: {user.cat && "cat"} {user.dog && (user.cat ? " and dog" : "dog")}</li>
    )
    return (<ol>{list}</ol>);
  }



  render() {

    const hasPet = this.context.petList.cats.length > 0 || this.context.petList.dogs.length > 0
    return (
      <div className="App">
        <Header />
        {this.context.inQueue && hasPet
          ? this.renderPetInfo()
          : this.renderDescription()}
        <Buttons 
          setAdoption={this.setAdoption}
          displayAdoption={this.state.displayAdoption}
          forceAppUpdate={this.forceUpdate}/>
        {this.state.displayAdoption === true
          ? <Congrats />
          : ''}
          {this.renderUsers()}
      </div>
    );
  }
}
