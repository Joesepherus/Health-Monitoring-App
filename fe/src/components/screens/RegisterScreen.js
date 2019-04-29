import React, { Component } from 'react'
import axios from 'axios'
import { server_api, showToast, redirect } from '../../global/global'
import CustomInput from '../basic/CustomInput/CustomInput'
import CustomButton from '../basic/CustomButton/CustomButton'
import './RegisterScreen.css'
import CustomHeader from '../basic/CustomHeader/CustomHeader'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  register = data => {
    let admin = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    let promise = new Promise((resolve, reject) => {
      resolve(
        axios
          .post(server_api + '/api/admin', {
            admin
          })
          .then(response => {
            showToast(response.data.message, 'info')
            redirect('/login', this.props.history)
            // return response
          })
          .catch(function(error) {})
      )
    })
    // promise.then(response => {
    //   this.getProjects()
    //   this.getProject(this.project._id)
    // })
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="layoutCenter">
        <CustomHeader type="h1">Registrácia</CustomHeader>
        <div className="registerForm">
          <CustomInput
            placeholder="meno"
            value={this.state.name}
            name="name"
            onChange={this.onChange}
            className="registerInput"
          />
          <CustomInput
            placeholder="email"
            value={this.state.email}
            name="email"
            onChange={this.onChange}
            className="registerInput"
          />
          <CustomInput
            placeholder="heslo"
            value={this.state.password}
            name="password"
            onChange={this.onChange}
            className="registerInput"
            type="password"
          />
          <CustomButton onClick={this.register} color="red">
            Registruj sa
          </CustomButton>
          <div>
            <Link to="/login">Prihlás sa</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(RegisterScreen))
