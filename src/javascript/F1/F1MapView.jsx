const React = require('react');
const F1Store = require('./F1Store');

module.exports = React.createClass({
  displayName: "F1MapView",
  
  getInitialState: function() {
    return {
      coordinates: F1Store.raceCoordinates(),
      info: F1Store.raceInfo()
    };
  },

  componentWillMount: function() {
    F1Store.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount: function() {
    F1Store.removeChangeListener(this._onStoreChange);

  },

  componentDidMount: function() {
    this.renderMap();
  },

  componentDidUpdate: function() {
    this.renderMap();
  },

  renderMap: function() {

    var mapOptions = {
      center: this.state.coordinates,
      zoom: 16,
      panControl: false,
      streetViewControl: false,
      mapTypeControl: false
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  },
  
  render: function() {
    return ( 
      <div style={{float: "left"}}>
        <div id="map-canvas"></div>
        <h2>{`${this.state.info.circuitName}, ${this.state.info.locality}, ${this.state.info.country}`}</h2>
      </div>
     );
  },

  _onStoreChange: function() {
    this.setState({
      coordinates: F1Store.raceCoordinates(),
      info: F1Store.raceInfo()
    });
  }

});
