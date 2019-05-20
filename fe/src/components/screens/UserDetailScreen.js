import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import CustomForm from '../complex/CustomForm/CustomForm'
import CustomButton from '../basic/CustomButton/CustomButton'
import CustomHeader from '../basic/CustomHeader/CustomHeader'
import CustomTable from '../basic/CustomTable/CustomTable'
import CustomLineChart from '../basic/CustomLineChart/CustomLineChart'
import CustomModal from '../basic/CustomModal/CustomModal'
import CustomGoogleMap from '../basic/CustomGoogleMap/CustomGoogleMap'

let head = [
  { value: 'Tep srdca', name: 'heartRate' },
  { value: 'Dátum', name: 'date' }
]

let interval

class UserDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      modalStatus: false,
      formData: [
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
        }
      ]
    }
  }

  componentDidMount() {
    this.props.store.setActiveHeader('dashboard')
    this.getUser()
  }

  getUser = async () => {
    let userId = this.props.match.params.userId
    let adminId = this.props.match.params.adminId
    interval = setInterval(async () => {
      let user = await this.props.store.getUser(adminId, userId)
      let chart = user.heartRate.map(hr => {
        return { x: hr.date, y: hr.heartRate }
      })
      this.setState({
        email: user.email,
        name: user.name,
        heartRate: user.heartRate,
        chart: chart
      })
    }, 1000)
  }

  updateUser = async () => {
    let updatedUser = await this.props.store.updateUser(
      this.state.email,
      this.state.name
    )

    this.setState({
      email: updatedUser.email,
      name: updatedUser.name
    })
  }

  deleteUser = () => {
    this.props.store.deleteUser(this.props.history)
    clearInterval(interval)
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
        <CustomHeader type="h1">Detail používateľa</CustomHeader>
        <CustomForm
          type="userDetail"
          data={this.state.formData}
          onClick={this.updateUser}
          onChange={this.onChange}
          name={this.state.name}
          email={this.state.email}
        />
        <div className="userDetail_btns">
          <CustomButton className="btn" onClick={this.updateUser} color="blue">
            Zmeniť
          </CustomButton>
          <CustomButton onClick={this.toggleModal} color="red">
            Vymaž
          </CustomButton>
        </div>
        <div className="userDetail-data">
          <CustomLineChart data={this.state.chart} />
          <CustomGoogleMap />
          <CustomTable head={head} body={this.state.heartRate} />
        </div>
        <CustomModal
          open={this.state.modalStatus}
          toggleModal={this.toggleModal}
          decline={this.toggleModal}
          accept={this.deleteUser}
          header="Vymazanie kolobežkára"
          body={
            'Naozaj chcete vymazať kolobežkára "' +
            this.props.store.user.name +
            '"?'
          }
        />
      </div>
    )
  }
}

export default inject('store')(observer(UserDetailScreen))
