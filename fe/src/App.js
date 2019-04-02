import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { subscribeToTimer } from './api/api'
import Card from './components/basic/CustomCard/CustomCard'

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
      <div className="App">
        <Card />
        <p>{this.state.timestamp}</p>
      </div>
    )
  }
}

export default App
