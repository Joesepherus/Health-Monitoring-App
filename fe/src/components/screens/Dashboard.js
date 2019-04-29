import React, { Component } from 'react'
import '../../App.css'
// import { subscribeToHeartRate } from '../../api/api'
import CustomCard from '../basic/CustomCard/CustomCard.tsx'
import ContainerPaddingUI from '../containers/ContainerPaddingUI/ContainerPaddingUI'
import { Grid } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'
import { redirect } from '../../global/global'
import CustomFAB from '../basic/CustomFAB/CustomFAB'
import { mdiPlus } from '@mdi/js'
import { Link } from 'react-router-dom'
import CustomButton from '../basic/CustomButton/CustomButton'
// mockup data for people
// let mockupPeople = require('../../assets/mockup_data/mockPeople.json')

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      heartRate: [],
      adminId: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.store.admin._id !== this.state.adminId) {
    //   this.setState({ adminId: this.props.store.admin._id })
    //   subscribeToHeartRate((err, heartRate) => {
    //     this.setState({
    //       heartRate
    //     })
    //   }, this.props.store.admin._id)
    // }
  }

  render() {
    const { store } = this.props
    return (
      <div>
        <ContainerPaddingUI>
          <div className="jumbotron" style={{ width: '100%' }}>
            <h1 className="display-4">Monitorovanie používateľov</h1>
            <p className="lead">
              Appka na monitorovanie používateľov kolobežiek v reálnom čase.
            </p>
            <hr className="my-4" />
            <h2>Vitaj {this.props.store.admin.name}!</h2>
            <p>Pod týmto textom sú zobrazený všetci vaši používateľia.</p>
            <CustomButton
              color="blue"
              onClick={() => redirect('/about-app', this.props.history)}
            >
              Viacej o appke
            </CustomButton>
          </div>
          {store.admin.users.length > 0 &&
            store.admin.users.map((person, index) => {
              return (
                <Grid.Column key={index}>
                  <Link
                    to={
                      '/user-detail/admin=' +
                      store.admin._id +
                      '&user=' +
                      person._id
                    }
                  >
                    <CustomCard
                      person={person}
                      className={
                        this.state.heartRate[index] > 100 ? 'userAlert' : null
                      }
                    />
                  </Link>
                </Grid.Column>
              )
            })}
          <p>{this.state.timestamp}</p>
        </ContainerPaddingUI>
        <CustomFAB
          icon={mdiPlus}
          onClick={() => {
            redirect('/add-user', this.props.history)
          }}
        />
      </div>
    )
  }
}

export default inject('store')(observer(Dashboard))
