import React, { Component } from 'react'
import CustomHeader from '../basic/CustomHeader/CustomHeader'
import ContainerPaddingUI from '../containers/ContainerPaddingUI/ContainerPaddingUI'
import CustomForm from '../complex/CustomForm/CustomForm'
import CustomButton from '../basic/CustomButton/CustomButton'
import { observer, inject } from 'mobx-react'

class AddUserScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: ''
    }
    this.formData = [
      {
        type: 'input',
        name: 'email',
        placeholder: 'email',
        value: this.state.email,
        label: 'Email'
      },
      {
        type: 'input',
        name: 'name',
        placeholder: 'meno',
        value: this.state.name,
        label: 'Meno'
      }
    ]
  }

  createNewUser = () => {
    let user = {
      email: this.state.email,
      name: this.state.name
    }
    this.props.store.addUser(user, this.props.history)
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <ContainerPaddingUI className="addUser">
          <CustomHeader type="h1">Pridávanie nového používateľa</CustomHeader>
          <CustomForm
            type="addUser"
            data={this.formData}
            onClick={this.createNewUser}
            onChange={this.onChange}
          />
          <CustomButton onClick={this.createNewUser} color="blue">
            Vytvoriť
          </CustomButton>
        </ContainerPaddingUI>
      </div>
    )
  }
}

export default inject('store')(observer(AddUserScreen))
