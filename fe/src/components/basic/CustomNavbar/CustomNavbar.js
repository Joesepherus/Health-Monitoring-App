import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import CustomButton from '../CustomButton/CustomButton'
import { Link } from 'react-router-dom'

export default class CustomNavbar extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/dashboard">Dashboard</Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav>
          <Link to="/admin-detail">
            <CustomButton color="white">Profil</CustomButton>
          </Link>
          <CustomButton onClick={this.props.logout} color="red">
            Odhlásiť sa
          </CustomButton>
        </Nav>
      </Navbar>
    )
  }
}
