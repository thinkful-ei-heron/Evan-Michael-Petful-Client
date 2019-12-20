import React, { Component } from 'react';

const PetContext = React.createContext ({
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
  render() {
    const value = {
      petList:this.state.petList,
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

