import { decorate, observable, action } from 'mobx'
import {
  server_api,
  showToast,
  setLoginStatus,
  redirect
} from '../global/global'
import axios from 'axios'

class store {
  // ===== LOGGED IN =====
  loggedIn = false
  admin = { users: [] }
  user = {}

  setLoggedIn(status) {
    this.loggedIn = status
  }

  async login(email, password) {
    let res = await axios
      .post(server_api + '/api/admin/login', {
        admin: {
          email: email,
          password: password
        }
      })
      .then(response => {
        if (response.data.status === 200) {
          setLoginStatus(true, response.data.admin_id)
          showToast(response.data.message, 'info')
          this.admin = response.data.admin
          return response
        } else {
          showToast(response.data.message, 'error')
          return null
        }
      })
      .catch(function(error) {
        // showToast(error.data.message)
      })
    return res
  }

  getAdmin(adminId) {
    axios
      .get(server_api + '/api/admin/' + adminId)
      .then(response => {
        this.admin = response.data
      })
      .catch(function(error) {})
  }

  async getUser(adminId, userId) {
    let user = await axios
      .get(server_api + '/api/admin=' + adminId + '&user=' + userId)
      .then(response => {
        this.user = response.data
        return response.data
      })
      .catch(function(error) {})
    return user
  }

  addUser(user, history) {
    axios
      .post(server_api + '/api/user', {
        user,
        admin_id: this.admin._id
      })
      .then(response => {
        if (response.data.status === 200) {
          showToast(response.data.message, 'info')
          this.getAdmin(this.admin._id)
          redirect('/', history)
        } else {
          showToast(response.data.message, 'error')
        }
      })
      .catch(function(error) {
        // showToast(error.data.message)
      })
  }

  async updateUser(email, name) {
    let user = await axios
      .put(server_api + '/api/user/' + this.user._id, {
        adminId: this.admin._id,
        user: {
          email: email,
          name: name
        }
      })
      .then(response => {
        if (response.data.status === 200) {
          showToast(response.data.message, 'info')
          this.getAdmin(this.admin._id)
          return response.data.user
        } else {
          showToast(response.data.message, 'error')
        }
      })
      .catch(function(error) {
        // showToast(error.data.message)
      })
    return user
  }

  deleteUser(history) {
    axios
      .delete(
        server_api +
          '/api/user/adminId=' +
          this.admin._id +
          '&userId=' +
          this.user._id
      )
      .then(response => {
        if (response.data.status === 200) {
          showToast(response.data.message, 'info')
          this.getAdmin(this.admin._id)
          redirect('/', history)
        } else {
          showToast(response.data.message, 'error')
        }
      })
      .catch(function(error) {
        // showToast(error.data.message)
      })
  }

  async updateAdmin(email, name) {
    let admin = await axios
      .put(server_api + '/api/admin/' + this.admin._id, {
        admin: {
          email: email,
          name: name
        }
      })
      .then(response => {
        if (response.data.status === 200) {
          showToast(response.data.message, 'info')
          this.admin = response.data.admin
          return response.data.admin
        } else {
          showToast(response.data.message, 'error')
        }
      })
      .catch(function(error) {
        // showToast(error.data.message)
      })
    return admin
  }

  changePassword(oldPassword, newPassword) {
    axios
      .put(server_api + '/api/admin/changePassword/' + this.admin._id, {
        admin: {
          oldPassword: oldPassword,
          newPassword: newPassword
        }
      })
      .then(response => {
        if (response.data.status === 200) {
          showToast(response.data.message, 'info')
          return response.data.admin
        } else {
          showToast(response.data.message, 'error')
        }
      })
      .catch(function(error) {
        // showToast(error.data.message)
      })
  }

  deleteAdmin(history) {
    axios
      .delete(server_api + '/api/admin/' + this.admin._id)
      .then(response => {
        if (response.data.status === 200) {
          showToast(response.data.message, 'info')
          setLoginStatus(false)
          redirect('/login', history)
        } else {
          showToast(response.data.message, 'error')
        }
      })
      .catch(function(error) {
        // showToast(error.data.message)
      })
  }
}

decorate(store, {
  loggedIn: observable,
  admin: observable,
  user: observable,
  setLoggedIn: action,
  getAdmin: action,
  getUser: action,
  updateUser: action,
  deleteUser: action,
  updateAdmin: action,
  deleteAdmin: action
})

export default new store()
