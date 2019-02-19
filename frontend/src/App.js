// core
import React, { Component } from 'react'
// libraries
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
// custom
import './App.css'
import AllScooters from './pages/AllUsers'
import { subscribeToTimer } from './api/api'
import common_sk from './translations/sk/common.json'
import common_en from './translations/en/common.json'

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'sk', // language to use
  resources: {
    sk: {
      common: common_sk // 'common' is our custom namespace
    },
    en: {
      common: common_en
    }
  }
})

class App extends Component {
  constructor(props) {
    super(props)
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    )
    this.state = {
      timestamp: 0
    }
  }

  render() {
    return (
      <I18nextProvider i18n={i18next}>
        <AllScooters />
        <p>{this.state.timestamp}</p>
      </I18nextProvider>
    )
  }
}

export default App
