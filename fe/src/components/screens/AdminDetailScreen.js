import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import CustomForm from '../complex/CustomForm/CustomForm'
import CustomButton from '../basic/CustomButton/CustomButton'
import CustomHeader from '../basic/CustomHeader/CustomHeader'
import CustomModal from '../basic/CustomModal/CustomModal'

class AdminDetailScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.store.admin.name,
      email: this.props.store.admin.email,
      minHeartRate: this.props.store.admin.minHeartRate,
      maxHeartRate: this.props.store.admin.maxHeartRate,
      modalStatus: false,
      oldPassword: '',
      newPassword: '',
      basicDataForm: [
        {
          type: 'input',
          name: 'email',
          placeholder: 'email',
          label: 'Email'
        },
        {
          type: 'input',
          name: 'name',
          placeholder: 'meno',
          label: 'Meno'
        },
        {
          type: 'input',
          name: 'minHeartRate',
          placeholder: 'minimálny tep',
          label: 'Minimálny tep'
        },
        {
          type: 'input',
          name: 'maxHeartRate',
          placeholder: 'maximálny tep',
          label: 'Maximálny tep'
        }
      ],
      changePassForm: [
        {
          type: 'input',
          name: 'oldPassword',
          placeholder: 'pôvodné heslo',
          label: 'Pôvodné heslo'
        },
        {
          type: 'input',
          name: 'newPassword',
          placeholder: 'nové heslo',
          label: 'Nové heslo'
        }
      ]
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //
  //   if (props.store.admin.name !== state.name) {
  //     return {
  //       name: props.store.admin.name,
  //       email: props.store.admin.email
  //     }
  //   }

  //   // Return null if the state hasn't changed
  //   return null
  // }

  componentDidMount() {
    this.props.store.getAdmin(localStorage.getItem('id'))
    this.props.store.setActiveHeader('dashboard')
  }

  componentDidUpdate(nextProps) {
    if (nextProps.store.admin.name !== this.state.name) {
      this.setState({
        name: nextProps.store.admin.name,
        email: nextProps.store.admin.email,
        minHeartRate: nextProps.store.admin.minHeartRate,
        maxHeartRate: nextProps.store.admin.maxHeartRate
      })
    }
  }

  updateAdmin = async () => {
    let updatedAdmin = await this.props.store.updateAdmin(
      this.state.email,
      this.state.name,
      this.state.minHeartRate,
      this.state.maxHeartRate
    )

    this.setState({
      email: updatedAdmin.email,
      name: updatedAdmin.name,
      minHeartRate: updatedAdmin.minHeartRate,
      maxHeartRate: updatedAdmin.maxHeartRate
    })
  }

  changePassword = () => {
    this.props.store.changePassword(
      this.state.oldPassword,
      this.state.newPassword
    )
  }

  deleteAdmin = () => {
    this.props.store.deleteAdmin(this.props.history)
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value
    })
  }

  toggleModal = () => {
    this.setState({
      modalStatus: !this.state.modalStatus
    })
  }

  render() {
    return (
      <div className="userDetail">
        <CustomHeader type="h1">Profil admina</CustomHeader>
        <CustomHeader type="h3">Základné údaje</CustomHeader>
        <CustomForm
          type="userDetail"
          data={this.state.basicDataForm}
          onChange={this.onChange}
          name={this.state.name}
          email={this.state.email}
          minHeartRate={this.state.minHeartRate}
          maxHeartRate={this.state.maxHeartRate}
        />
        <CustomButton className="btn" onClick={this.updateAdmin} color="blue">
          Zmeniť
        </CustomButton>
        <CustomHeader type="h3">Zmena hesla</CustomHeader>
        <CustomForm
          type="userDetail"
          data={this.state.changePassForm}
          onChange={this.onChange}
          oldPassword={this.state.oldPassword}
          newPassword={this.state.newPassword}
        />
        <CustomButton
          className="btn"
          onClick={this.changePassword}
          color="blue"
        >
          Zmeniť
        </CustomButton>
        <div className="userDetail_btns">
          <CustomButton onClick={this.toggleModal} color="red">
            Zmazať profil
          </CustomButton>
        </div>
        <CustomModal
          open={this.state.modalStatus}
          toggleModal={this.toggleModal}
          decline={this.toggleModal}
          accept={this.deleteAdmin}
          header="Vymazanie účtu"
          body={
            'Naozaj chcete vymazať svoj účet "' +
            this.props.store.admin.name +
            '"?'
          }
        />
      </div>
    )
  }
}

export default inject('store')(observer(AdminDetailScreen))
