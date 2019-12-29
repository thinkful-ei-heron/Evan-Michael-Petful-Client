import React, { Component } from 'react';

const PetContext = React.createContext ({
  inQueue: false,
  setInQueue: () => {},
  petList: [],
  userList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setPetList: (petList) => {},
  setUserList: (userList) => {},
})

export default PetContext

export class PetProvider extends Component {
  state = { //petList {dogs: [], cats: []} or petList [[dogs],[cats]]
    petList: {cats: [], dogs: []},
    userList: [],
    inQueue: false,
    error: null,
  };
  setError = error => {
    this.setState({ error })
  }
  clearError = error => {
    this.setState({ error })
  }
  setPetList = petList => {
    this.setState({ petList })
  }
  setInQueue = (inQueue) => {
    this.setState({ inQueue: true })
  }
  setUserList = (userList) => {
    this.setState({ userList })
  }
  render() {
    const value = {
      inQueue: this.state.inQueue,
      setInQueue: this.setInQueue,
      petList: this.state.petList,
      userList: this.state.userList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setPetList: this.setPetList,
      setUserList: this.setUserList
    }
    return(
      <PetContext.Provider value={value}>
        {this.props.children}
      </PetContext.Provider>
    )
  }
}

