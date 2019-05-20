import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class AboutAuthorScreen extends Component {
  componentDidMount() {
    this.props.store.setActiveHeader('about-author')
  }

  render() {
    return <div />
  }
}

export default inject('store')(observer(AboutAuthorScreen))
