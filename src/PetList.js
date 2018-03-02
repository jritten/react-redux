import React from 'react'
import Pet from './Pet'

class PetList extends React.Component {
    pets = this.props.pets.map((pet) => {
      const isFavorite = this.props.favorites.findIndex((favorite) => favorite.id === pet.id) > -1
      return (
        <Pet
          favorite={isFavorite}
          toggleFavorite={this.props.toggleFavorite}
          key={pet.id}
          pet={pet}
        />
      )
    })
    return (
      <div className='petlist'>
        <h1>{this.props.title}</h1>
        <div>
          {pets}
        </div>
      </div>
    )
  }
}

export default PetList