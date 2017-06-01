import React from 'react';
import Request from 'request';

export default class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      map: null,
      location: props.location
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({location: nextProps.location});
  }

  componentDidMount() {
    // make a request to geocode to get the coordinates from an address
    Request(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.location}&key=AIzaSyAtu5-1cj7wJeCiUVC0zhIbWHDtee4fDlo`, (error, response, body) => {
      const coordinates = JSON.parse(body).results[0].geometry.location;
      const options = {
           zoom: 14,
           mapTypeId: google.maps.MapTypeId.TERRAIN,
           maxZoom: 20,
           center: coordinates,
       };

       // init the map
       const map = new google.maps.Map(document.getElementById('map'), options);
       // place a marker on the map to point the stained glass
       const marker = new google.maps.Marker({
         position: coordinates,
         map: map
       });

       this.setState({map, marker});
    });
  }

  render() {
    return (
      <div id="map"></div>
    );
  }

}
