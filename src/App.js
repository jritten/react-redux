import React from 'react'
import credentials from './credentials'
import petfinder from './petfinder-client'
const pf = petfinder(credentials)
import Pet from './Pet'
import SearchControls from './SearchControls'

class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      animal: 'dog',
      breed: 'Havanese',
      location: 'San Francisco, CA',
      pets: [],
      favorites: []
    }
  },
  // componentDidMount () {
  //   const { animal, breed, location } = this.state
  //   const promise = pf.pet.find({animal, breed, location, output: 'full'})
  //   promise.then((data) => {
  //     const pets = data.petfinder.pets ?  data.petfinder.pets.pet : []
  //     this.setState({pets})
  //   })
  // },
  componentDidMount () {
    this.search()
  },
  search () {
    const { animal, breed, location } = this.state
    const promise = pf.pet.find({animal, breed, location, output: 'full'})
    promise.then((data) => {
      const pets = data.petfinder.pets ?  data.petfinder.pets.pet : []
      this.setState({pets})
      console.log(data)
    })
  },
  changeBreed (breed) {
    this.setState({ breed }, () => this.search())
  },
  changeAnimal (animal) {
    this.setState({animal, breed: ''}, () => this.search())
  },
  toggleFavorite (pet, toAdd) {
    let { favorites } = this.state
    favorites = toAdd ? favorites.concat(pet) : favorites.filter((current) => pet.id !== current.id)
    this.setState({favorites})
  },
  render () {
    return (
      <div className='app'>
        <img src='src/adopt-me.png' alt='adopt-me logo' />
        <SearchControls breed={this.state.breed} animal={this.state.animal} changeBreed={this.changeBreed} />
        <SearchControls
          breed={this.state.breed}
          animal={this.state.animal}
          changeBreed={this.changeBreed}
          changeAnimal={this.changeAnimal}
        />
        <div>
          {this.state.pets.map((pet) => (
            <Pet key={pet.id} pet={pet} />
          ))}
        </div>
        <PetList
          favorites={this.state.favorites}
          pets={this.state.pets}
          toggleFavorite={this.toggleFavorite}
          title={'Search Results'}
        />
        <PetList
          pets={this.state.favorites}
          favorites={this.state.favorites}
          toggleFavorite={this.toggleFavorite}
          title={'Favorites'}
        />
      </div>
    )
  }
}

export default App
