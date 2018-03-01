import React from 'react';
const MAX_DESCRIPTION_LENGTH = 150;

class Pet extends React.Component {
  render () {
    const photos = this.props.pet.media ? this.props.pet.media.photos.photo.filter((photo) => {
      return photo['@size'] === 'pn' 
    }) : [];
    const description = this.props.pet.description 
      ? this.props.pet.description.substring(
        0, 
        MAX_DESCRIPTION_LENGTH
      )
      : '';

      return (
        <div className='pet'>
          <div>
            {photos.map((photo, index) => {
              return (
                <img 
                  alt={`${this.props.pet.name} number ${index + 1}`} 
                  key={photo.value} 
                  src={photo.value} 
                />
              );
            })}
          </div>
          <ul>
            <li>{this.props.pet.name}</li>
            <li>
              {this.props.pet.animal} : {" "}
              {Array.isArray(this.props.pet.breeds.breed) 
                ? this.props.pet.breeds.breed.join(", ")
                : this.props.pet.breeds.breed}
            </li> 
            <li>{this.props.pet.age}</li>
            <li>
              {this.props.pet.contact.city}
            </li>
          </ul>
        </div>
      )
  }
}

export default Pet;