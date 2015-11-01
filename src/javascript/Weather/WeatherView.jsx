const React = require('react');
const WeatherStore = require('./WeatherStore');
const WeatherActions = require('./WeatherActions');

module.exports = React.createClass({
  displayName: "WeatherView",
  getInitialState: function() {
    const initialCity = "Edmonton";
    return {
      "cities": WeatherStore.cities(),
      "selectedCity": initialCity,
      "forecast": WeatherStore.forecastFor(initialCity)
    };

    // return {
    //   "cities": ["Edmonton", "Calgary"],
    //   "selectedCity": initialCity,
    //   "forecast": [
    //     {
    //       date: "2015-04-02",
    //       high: 5,
    //       low: -4,
    //       conditions: "cloudy"
    //     }
    //   ]
    // };

  },
  
  componentWillMount: function() {
    WeatherStore.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount: function() {
    WeatherStore.removeChangeListener(this._onStoreChange);
  },

  render: function() {

    const rows = this.state.forecast.map( day => {
      return(
        <tr>
          <td>{day.conditions}</td>
          <td>{day.high}</td>
          <td>{day.low}</td>
        </tr>
      );
    });

    const cityOptions =  this.state.cities.map( city => {
      return( <option value={city}>{city}</option> );
    });

    return (
      <div>
      <select value={this.state.selectedCity} onChange={this._selectCity}>
        {cityOptions}
      </select>

      <table>
        <thead>
          <tr>
            <th>Conditions</th>
            <th>High</th>
            <th>Low</th>
          </tr>            
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>

      <button onClick={this._makeWorse}>Worse</button>
      <button onClick={this._makeBetter}>Better</button>

      </div>
    );

  },

  _onStoreChange: function() {
    this.setState({"forecast": WeatherStore.forecastFor(this.state.selectedCity)});
  },

  _selectCity: function(event) {
    const newCity = event.currentTarget.value;
    this.setState({
      "selectedCity": newCity,
      "forecast": WeatherStore.forecastFor(newCity)
    });
  },

  _makeWorse: function() {
    WeatherActions.makeWorse(this.state.selectedCity);
  },

  _makeBetter: function() {
    WeatherActions.makeBetter(this.state.selectedCity);
  }
  
});
