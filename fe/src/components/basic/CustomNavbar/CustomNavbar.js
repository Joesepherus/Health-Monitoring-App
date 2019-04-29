import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CustomButton from '../CustomButton/CustomButton'
import { Link } from 'react-router-dom'

export default class CustomNavbar extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="about-app">O appke</Link>
          <Link to="about-author">O autorovi</Link>
        </Nav>
        <Nav>
          <Link to="/admin-detail">
            <CustomButton inverted>Profil</CustomButton>
          </Link>
          <CustomButton onClick={this.props.logout} color="red">
            Odhlásiť sa
          </CustomButton>
        </Nav>
      </Navbar>
    )
  }
}
