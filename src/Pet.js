import React from 'react'
const MAX_DESCRIPTION_LENGTH = 150

class Pet extends React.Component {
  handleFavoriteChange () {
    console.log(this.props.pet)
    this.props.toggleFavorite(this.props.pet, !this.props.favorite)
  },
  render () {
    <input type='checkbox' checked={this.props.favorite} onChange={this.handleFavoriteChange} />
    const photos = this.props.pet.media ? this.props.pet.media.photos.photo.reduce((acc, photo) => {
      if (photo['@size'] === 'pn') {
        acc.push(photo.value)
      }
      return acc
    }, []) : []
    const description = this.props.pet.description || ''
    return(
      <div className='pet'>
        <div>
          {photos.map((photo, index) => (
            <img key={photo} alt={`${this.props.pet.name} number ${index+1}`} src={photo} />
          ))}
        </div>
        <ul>
          <li>{this.props.pet.name}</li>
          <li>{this.props.pet.animal} : {Array.isArray(this.props.pet.breeds.breed) ? this.props.pet.breeds.breed.join(', ') : this.props.pet.breeds.breed  }</li>
          <li>{this.props.pet.age}</li>
          <li>{this.props.pet.contact.city}, {this.props.pet.contact.state}</li>
        </ul>
        <p>{description.substring(0, MAX_DESCRIPTION_LENGTH)}{description.length > MAX_DESCRIPTION_LENGTH ? '...' : ''}</p>
      </div>
    )
  }
}

export default Pet