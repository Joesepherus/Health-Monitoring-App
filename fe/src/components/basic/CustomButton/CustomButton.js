import React from 'react'
import { Button } from 'semantic-ui-react'

export default class CustomButton extends React.Component {
  render() {
    return (
      <Button
        // primary
        onClick={this.props.onClick}
        className={this.props.className}
        color={this.props.color}
      >
        {this.props.children}
      </Button>
    )
  }
}
