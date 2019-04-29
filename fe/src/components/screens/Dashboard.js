import React, { Component } from 'react'
import '../../App.css'
import { subscribeToHeartRate } from '../../api/api'
import CustomCard from '../basic/CustomCard/CustomCard.tsx'
import ContainerPaddingUI from '../containers/ContainerPaddingUI/ContainerPaddingUI'
import { Grid } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { setLoginStatus, redirect, showToast } from '../../global/global'
import CustomFAB from '../basic/CustomFAB/CustomFAB'
import { mdiPlus } from '@mdi/js'
import { Link } from 'react-router-dom'
// mockup data for people
let mockupPeople = require('../../assets/mockup_data/mockPeople.json')

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      heartRate: [],
      adminId: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.store.admin._id !== this.state.adminId) {
      this.setState({ adminId: this.props.store.admin._id })
      subscribeToHeartRate((err, heartRate) => {
        this.setState({
          heartRate
        })
      }, this.props.store.admin._id)
    }
  }

  render() {
    const { store } = this.props
    return (
      <div>
        <ContainerPaddingUI>
          <div class="jumbotron" style={{ width: '100%' }}>
            <h1 class="display-4">Monitorovanie používateľov</h1>
            <p class="lead">
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <hr class="my-4" />
            <p>
              It uses utility classes for typography and spacing to space
              content out within the larger container.
            </p>
            <a class="btn btn-primary btn-lg" href="#" role="button">
              Learn more
            </a>
          </div>
          {store.admin.users.length > 0 &&
            store.admin.users.map((person, index) => {
              return (
                <Grid.Column>
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
