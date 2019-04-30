import React, { Component } from 'react'
import './CustomCard.scss'
import CustomButton from '../CustomButton/CustomButton'

export default class CustomCard extends Component {
  render() {
    const { person } = this.props
    console.log(person)
    return (
      <div
        className={this.props.className + ' card'}
        style={{ width: '18rem' }}
      >
        <img
          src={person.photo}
          className="card-img-top card-img"
          alt="person_photo"
        />
        <div className="card-body">
          <h5 className="card-title">{person.name}</h5>
          <h5 className="card-title">{person.email}</h5>
          <p className="card-text">
            {person && person.heartRate.length
              ? person.heartRate[person.heartRate.length - 1].heartRate
              : null}
          </p>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <CustomButton className="btn btn-primary" color="blue">
            Viacej o kolobežkárovi
          </CustomButton>
        </div>
      </div>
    )
  }
}
