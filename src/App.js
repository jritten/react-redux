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
      pets: []
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
  render () {
    return (
      <div className='app'>
        <img src='src/adopt-me.png' alt='adopt-me logo' />
        <SearchControls breed={this.state.breed} animal={this.state.animal} changeBreed={this.changeBreed} />
        <div>
          {this.state.pets.map((pet) => (
            <Pet key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    )
  }
}

export default App
