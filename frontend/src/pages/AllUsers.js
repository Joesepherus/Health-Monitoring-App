// core
import React, { Component } from 'react'
// libraries
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { translate, Trans } from 'react-i18next'
// custom
import '../App.css'
import AppBar from '../components/AppBar'
import Card from '../components/Card'

const scooters = [0, 1, 2, 3, 4, 5]

const styles = {
  mainContainer: {
    backgroundColor: '#282c34',
    minHeight: 'calc(100vh)'
    // display: 'flex',
    // flexDirection: 'column',
    // fontSize: 'calc(10px + 2vmin)',
    // color: 'white'
  },
  gridContainer: {
    padding: 20,
    margin: 0,
    width: 'auto',
    display: 'flex',
    justifyContent: 'space-between'
  }
}

class AllScooters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testVariable: 5
    }
  }

  test = () => {
    this.setState({
      testVariable: this.state.testVariable++
    })
  }
  render() {
    const { classes, t } = this.props

    return (
      <div className={classes.mainContainer}>
        <header>
          <AppBar />
        </header>
        <Grid className={classes.gridContainer} container spacing={24}>
          {scooters.map(scooter => {
            return (
              <Grid item onClick={this.test.bind(this)}>
                <Card title={t('ALL_USERS.user')} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(translate('common')(AllScooters))
