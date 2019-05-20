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
import AboutAppScreen from '../../screens/AboutAppScreen'
import AboutAuthorScreen from '../../screens/AboutAuthorScreen'

class ScreensContainer extends Component {
  logout = () => {
    setLoginStatus(false)
    redirect('/login', history)
    showToast('Odhlásenie prebehlo úspešne.', 'info')
  }

  render() {
    return (
      <div>
        <CustomNavbar logout={this.logout} />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/about-app" component={AboutAppScreen} />
          <Route path="/about-author" component={AboutAuthorScreen} />
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
