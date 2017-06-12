import React from 'react'
import Request from 'request'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import { white } from 'material-ui/styles/colors'
import Clear from 'material-ui/svg-icons/content/clear'
import PathHelper from '../../helpers/PathHelper'

const getCourseDuration = (total_sec) => {
  var jour = Math.floor(total_sec / (24 * 3600))
  total_sec = total_sec - (jour * 24 * 3600)
  var heure = Math.floor(total_sec / 3600)
  total_sec = total_sec - (heure * 3600)
  var minute = Math.floor(total_sec / 60)
  heure = heure + (jour * 24)

  return heure + ' heures et ' + minute + " minutes"
}

const listStyle = {
  position: "fixed",
  bottom: 0,
  zIndex: 1,
  left: "40%",
  backgroundColor: "white"
}

export default class MapWithPath extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      map: null,
      path: props.path,
      currentPosition: null,
      duration: 0,
      distance: 0,
      fullListOpen: false
    }
    this._setMarker = this._setMarker.bind(this)
    this._getWaypoints = this._getWaypoints.bind(this)
    this._setRoute = this._setRoute.bind(this)
    this._updateCurrentPosition = this._updateCurrentPosition.bind(this)
    this._showFullList = this._showFullList.bind(this)
    this._removeStainedGlass = this._removeStainedGlass.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ path: nextProps.path })
  }

  _updateCurrentPosition () {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(pos => {
      const currentPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      this.setState({ currentPosition })
      resolve(pos)
    }, reject))
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
      return this._updateCurrentPosition()
        .then(() =>this._getWaypoints(map))
        .then(waypoints => Promise.all(waypoints.map(waypoint => this._setMarker(map, waypoint)))
          .then(() => this._setRoute(map, waypoints))
        )
        .then(() => this.setState({ map }))
    })
  }

  _getWaypoints () {
    return Promise.all(this.state.path.map(element => {
      return new Promise((resolve, reject) =>
        Request(`https://maps.googleapis.com/maps/api/geocode/json?address=${element.spatial[ 0 ]}&key=AIzaSyAtu5-1cj7wJeCiUVC0zhIbWHDtee4fDlo`, (error, response, body) => {
          resolve({
            name: element.name[ 0 ],
            coordinates: JSON.parse(body).results[ 0 ].geometry.location
          })
        })
      )
    }))
  }

  _setMarker (map, waypoint) {
    return new Promise((resolve, reject) => {
      const marker = new google.maps.Marker({
        position: waypoint.coordinates,
        map: map,
        label: waypoint.name
      })
      resolve(marker)
    })
  }

  _setRoute (map, waypoints) {
    const googleDirectionService = new google.maps.DirectionsService()
    const googleDirectionRenderer = new google.maps.DirectionsRenderer({ map })

    const options = {
      origin: this.state.currentPosition,
      destination: waypoints[ 0 ].coordinates,
      waypoints: waypoints.map(waypoint => ({ location: waypoint.coordinates })),
      travelMode: google.maps.DirectionsTravelMode.WALKING,
      optimizeWaypoints: true
    }

    return new Promise((resolve, reject) => googleDirectionService.route(options, (direction, requestStatus) => {
        let duration = 0
        let distance = 0
        if (requestStatus == google.maps.DirectionsStatus.OK) {
          googleDirectionRenderer.setDirections(direction)
          direction.routes[ 0 ].legs.map(element => {
            duration += element.duration.value
            distance += element.distance.value
          })
          this.setState({ duration, distance })
        }
      })
    )
  }

  _showFullList () {
    this.setState({ fullListOpen: !this.state.fullListOpen })
  }

  _removeStainedGlass (stainedGlassId) {
    PathHelper.remove(stainedGlassId)
  }

  render () {
    return (
      <div className="fullheight">
        <List style={listStyle}>
          <ListItem
            primaryText={`Distance: ${Math.ceil(this.state.distance / 1000)} Km - Durée: ${getCourseDuration(this.state.duration)}`}
            onClick={this._showFullList}/>
          {this.state.path && this.state.fullListOpen &&
          this.state.path.map(element =>
            <ListItem primaryText={<Link to={`/stained-glass/${element.id}`}>{element.name}</Link>}
                      leftAvatar={<Avatar src={element.resource[ 0 ]}/>}
                      rightIcon={<Clear onClick={() => this._removeStainedGlass(element.id)}/>}/>
          )
          }
        </List>
        <div id="map"></div>
      </div>
    )
  }

}
