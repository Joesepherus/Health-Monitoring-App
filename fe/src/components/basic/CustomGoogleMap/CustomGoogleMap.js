import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import CustomIcon from '../CustomIcon/CustomIcon'
import { mdiMapMarker } from '@mdi/js'

const AnyReactComponent = ({ text }) => <div>{text}</div>

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 48.11586,
      lng: 17.11631
    },
    zoom: 15
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%', marginBottom: 40 }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCVQSe4ccRMG2Xr-8xHJlrdhXwzavLYRpY' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* <AnyReactComponent lat={48.11586} lng={17.11631} text="My Marker" /> */}
          <CustomIcon icon={mdiMapMarker} color="red" size={2} />
        </GoogleMapReact>
      </div>
    )
  }
}

export default SimpleMap
