import React from 'react';

import Request from 'request';

import { GoogleMapKey } from '../../config/constants';

const getFormattedTime = (secondes) => {
    let hours = String(Math.floor(secondes / 3600));
    let minutes = String(Math.floor((secondes % 3600) / 60));

    return `${hours}h${minutes.length === 1 ? "0" : ""}${minutes}`;
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
        };

        this._setMarker = this._setMarker.bind(this);
        this._getWaypoints = this._getWaypoints.bind(this);
        this._setRoute = this._setRoute.bind(this);
        this._updateCurrentPosition = this._updateCurrentPosition.bind(this);
        this._initMap = this._initMap.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        // continue only if the path has changed
        if (nextProps.path === this.state.path) return;

        this.setState({ path: nextProps.path });
        this._initMap();
    }

    /**
     * Init the map
     */
    _initMap() {
        const TROYES_CENTER = new google.maps.LatLng(48.2973725, 4.0721523);
        const options = {
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            maxZoom: 20,
            center: TROYES_CENTER,
        };

        // init the map
        const map = new google.maps.Map(document.getElementById('map'), options);
        this._updateCurrentPosition()
          .then(_ => this._getWaypoints())
          .then(waypoints => Promise.all(waypoints.map(waypoint => this._setMarker(map, waypoint)))
              .then(_ => this._setRoute(map, waypoints))
          )
          .then(_ => this.setState({ map }));
    }

    /**
    * Update the position of the user on the map
    */
    _updateCurrentPosition () {
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(pos => {
            const currentPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
            this.setState({ currentPosition })
            resolve(pos)
        }, reject))
    }

    /**
     * Format the stained glasses of my path.
     * Replace each stained glass of my path by a simple object with his name and his coordinates (lat, lng)
     * @return {array} : formated stained glasses of my path
     */
    _getWaypoints () {
        // loop through path stained glasses
        return Promise.all(this.state.path.map(stainedGlass => {
            // get the stained glass coordinates from his string location
            return new Promise((resolve, reject) => {
                Request(`https://maps.googleapis.com/maps/api/geocode/json?address=${stainedGlass.spatial[0]}&key=${GoogleMapKey}`, (error, response, body) => {
                    resolve({
                        name: stainedGlass.name[0],
                        coordinates: JSON.parse(body).results[0].geometry.location
                    })
                })
            })
        }))
    }

    /**
     * Create a new Marker on the map
     * @param {Map} map : the google map
     * @param {object} waypoint : an object with 2 attributes : name and coordinates (lat and lng)
     * @return {Marker} the created marker
     */
    _setMarker (map, waypoint) {
        return new google.maps.Marker({
            position: waypoint.coordinates,
            map,
            label: waypoint.name
        });
    }

    /**
     * Calculate the route to take to vist all the stained glass in my path
     */
    _setRoute (map, waypoints) {
        const googleDirectionService = new google.maps.DirectionsService();
        const googleDirectionRenderer = new google.maps.DirectionsRenderer({ map });

        const options = {
            origin: this.state.currentPosition,
            destination: waypoints[0] ? waypoints[0].coordinates : this.state.currentPosition,
            waypoints: waypoints.map(waypoint => ({ location: waypoint.coordinates })),
            travelMode: google.maps.DirectionsTravelMode.WALKING,
            optimizeWaypoints: true
        };

        return new Promise((resolve, reject) => googleDirectionService.route(options, (direction, requestStatus) => {
            let duration = 0;
            let distance = 0;
            if (requestStatus == google.maps.DirectionsStatus.OK) {
                googleDirectionRenderer.setDirections(direction);
                direction.routes[0].legs.map(element => {
                    duration += element.duration.value
                    distance += element.distance.value
                });
                // send duration and distance to parent
                this.props.setPathInformation(getFormattedTime(duration), Math.ceil(distance / 1000));
            }
        }))
    }

    render() {
        return (
            <div id="map"></div>
        )
    }
 }
