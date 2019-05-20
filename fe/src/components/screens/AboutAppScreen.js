import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class AboutAppScreen extends Component {
  componentDidMount() {
    this.props.store.setActiveHeader('about-app')
  }

  render() {
    return <div />
  }
}

export default inject('store')(observer(AboutAppScreen))
