import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CustomButton from '../CustomButton/CustomButton'
import { Link } from 'react-router-dom'
import CustomIcon from '../CustomIcon/CustomIcon'
import { mdiMenu } from '@mdi/js'

export default class CustomNavbar extends Component {
  render() {
    return (
      // <Navbar className="navbar-collapse" bg="primary" variant="dark">
      //   <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      //   <Nav className="mr-auto">
      //     <Link to="/dashboard">Dashboard</Link>
      //     <Link to="about-app">O appke</Link>
      //     <Link to="about-author">O autorovi</Link>
      //   </Nav>
      //   <Nav>
      //     <Link to="/admin-detail">
      //       <CustomButton inverted>Profil</CustomButton>
      //     </Link>
      //     <CustomButton onClick={this.props.logout} color="red">
      //       Odhlásiť sa
      //     </CustomButton>
      //   </Nav>

      // </Navbar>

      <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* <span class="navbar-toggler-icon" /> */}
          <CustomIcon icon={mdiMenu} color="white" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link class="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/about-app">
                O appke
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link"
                to="/about-author"
                tabindex="-1"
                aria-disabled="true"
              >
                O autorovi
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <Link to="/admin-detail">
              <CustomButton inverted>Profil</CustomButton>
            </Link>
            <Link to="/">
              <CustomButton onClick={this.props.logout} color="red">
                Odhlásiť sa
              </CustomButton>
            </Link>
          </ul>
        </div>
      </nav>
    )
  }
}
