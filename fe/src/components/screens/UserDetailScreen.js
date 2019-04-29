import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import CustomForm from '../complex/CustomForm/CustomForm'
import CustomButton from '../basic/CustomButton/CustomButton'
import CustomHeader from '../basic/CustomHeader/CustomHeader'
import CustomTable from '../basic/CustomTable/CustomTable'
import CustomLineChart from '../basic/CustomLineChart/CustomLineChart'

let head = [
  { value: 'Tep srdca', name: 'heartRate' },
  { value: 'Dátum', name: 'date' }
]

class UserDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
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
    this.getUser()
  }

  getUser = async () => {
    let userId = this.props.match.params.userId
    let adminId = this.props.match.params.adminId
    setInterval(async () => {
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
    this.props.store.deleteUser()
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value
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
          <CustomButton onClick={this.deleteUser} color="red">
            Vymaž
          </CustomButton>
        </div>
        <div className="userDetail-data">
          <CustomLineChart data={this.state.chart} />
          <CustomTable head={head} body={this.state.heartRate} />
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(UserDetailScreen))
