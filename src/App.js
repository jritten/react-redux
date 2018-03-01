import React, { Component } from 'react';
import credentials from './credentials';
import petfinder from './petfinder-client';
import Pet from './Pet.js';

const pf = petfinder(credentials);

class App extends Component {
  // constructor (props) {
  //   super (props)
  //   this.state = {
  //     animal: 'dog',
  //     breed: 'Yorkie',
  //     location: 'Detroit, Michigan',
  //     pets: []
  //   }
  // },

  state = {  // stage three w babel
    animal: 'dog',
    breed: 'Havanese',
    location: 'San Francisco, CA',
    pets: []
  };

  componentDidMount () {
    const { animal, breed, location } = this.state;  // destructuring
    const promise = pf.pet.find({animal: animal, breed: breed, location: location, output: 'full'})
    promise.then((data) => {
      console.log(data)
      const pets = data.petfinder.pets ? data.petfinder.pets.pet : [];
      this.setState({pets: pets});
    }).catch(err => console.error(err));
  },

  render() {
    return (
      <div className="app">
        {this.state.pets.map(pet => (
          <Pet pet={pet} />
        ))}
      </div>
    );
  }
}

export default App;
