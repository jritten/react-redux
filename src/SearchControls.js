import React from 'react'
import petfinder, { ANIMALS } from './petfinder-client'
const pf = petfinder()

class SearchControls extends React.Component {
  state = {
    breeds: []
  }
  componentDidMount () {
    this.getNewBreeds(this.props.animal)
  },
  getNewBreeds (animal) {
    pf.breed.list({animal})
      .then((data) => {
        if (data.petfinder.breeds) {
          this.setState({breeds: data.petfinder.breeds.breed})
        }
      })
  },
  handleBreedChange (e) {
    this.props.changeBreed(e.target.value)
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.animal && nextProps.breed !== this.props.animal) {
      this.getNewBreeds(nextProps.animal)
    }
  },
  handleAnimalChange (e) {
    this.props.changeAnimal(e.target.value)
  },
  render () {
    const breedSelector = !this.props.animal ? null : (
      <select value={this.props.breed} onChange={this.handleBreedChange}>
        <option value=''></option>
        {this.state.breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
      <select value={this.props.animal} onChange={this.handleAnimalChange}>
        <option value=''></option>
        {ANIMALS.map((animal) => (
          <option key={animal} value={animal}>{animal}</option>
        ))}
      </select>
    )
    return (
      <div className='search'>
        {breedSelector}
      </div>
    )
  }
}

export default SearchControls