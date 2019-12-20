import React, { Component } from 'react';

const PetContext = React.createContext ({
  inQueue: false,
  setInQueue: () => {},
  petList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setPetList: (petList) => {}
})

export default PetContext

export class PetProvider extends Component {
  state = {
    petList: [],
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
  render() {
    const value = {
      inQueue: this.state.inQueue,
      setInQueue: this.setInQueue,
      petList: this.state.petList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setPetList:this.setPetList,
    }
    return(
      <PetContext.Provider value={value}>
        {this.props.children}
      </PetContext.Provider>
    )
  }
}

