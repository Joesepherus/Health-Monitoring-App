import React, { Component } from 'react'
import CustomNavbar from '../../basic/CustomNavbar/CustomNavbar'
import Dashboard from '../../screens/Dashboard'
import AddUserScreen from '../../screens/AddUserScreen'
import ErrorScreen from '../../screens/ErrorScreen'
import { Route, Switch } from 'react-router-dom'
import { setLoginStatus, redirect, showToast } from '../../../global/global'
import { observer, inject } from 'mobx-react'
import history from '../../../history'
import UserDetailScreen from '../../screens/UserDetailScreen'
import AdminDetailScreen from '../../screens/AdminDetailScreen'

class ScreensContainer extends Component {
  logout = () => {
    // this.props.store.setLoggedIn(false)
    setLoginStatus(false)
    redirect('/login', history)
    // window.location.href = '/login'
    showToast('Odhlásenie prebehlo úspešne.', 'info')
  }

  render() {
    return (
      <div>
        <CustomNavbar logout={this.logout} />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/add-user" component={AddUserScreen} />
          <Route
            path="/user-detail/admin=:adminId&user=:userId"
            component={UserDetailScreen}
          />
          <Route path="/admin-detail" component={AdminDetailScreen} />
          <Route path="*" component={ErrorScreen} />
        </Switch>
      </div>
    )
  }
}

export default inject('store')(observer(ScreensContainer))
