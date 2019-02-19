// core
import React, { Component } from 'react'
// libraries
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
// custom
import './App.css'
import AllScooters from './pages/AllScooters'
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
  render() {
    return (
      <I18nextProvider i18n={i18next}>
        <AllScooters />
      </I18nextProvider>
    )
  }
}

export default App
