import React from 'react'
import Request from 'request'

export default class MapWithPath extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      map: null,
      path: props.path
    }
    this._setMarkers = this._setMarkers.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ path: nextProps.path })
  }

  componentDidMount () {
    // make a request to geocode to get the coordinates from an address
    Request(`http://maps.google.com/maps/api/js?language=fr&libraries=places&key=AIzaSyAtu5-1cj7wJeCiUVC0zhIbWHDtee4fDlo`, (error, response, body) => {
      const TROYES_CENTER = new google.maps.LatLng(48.2973725, 4.0721523)
      const options = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        maxZoom: 20,
        center: TROYES_CENTER,
      }

      // init the map
      const map = new google.maps.Map(document.getElementById('map'), options)
      this._setMarkers(map)
      this.setState({ map })
    })
  }

  _setMarkers(map) {
    this.state.path.map(element =>
      Request(`https://maps.googleapis.com/maps/api/geocode/json?address=${element.spatial[0]}&key=AIzaSyAtu5-1cj7wJeCiUVC0zhIbWHDtee4fDlo`, (error, response, body) => {
        const coordinates = JSON.parse(body).results[ 0 ].geometry.location
        new google.maps.Marker({
          position: coordinates,
          map: map,
          label: element.name[ 0 ]
        })
      })
    )
  }

  render () {
    return (
      <div id="map"></div>
    )
  }

}
