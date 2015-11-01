const React = require('react');
const F1Actions = require('./F1Actions');
const F1Store = require('./F1Store');
const F1MapView = require('./F1MapView.jsx');
const F1ResultsView = require('./F1ResultsView.jsx');

module.exports = React.createClass({
  displayName: "F1View",
  getInitialState: function() {
    return {
      fetching: F1Store.fetching(),
      message: F1Store.message(),
      info: F1Store.raceInfo()
    };
  },
  
  componentWillMount: function() {
    F1Store.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount: function() {
    F1Store.removeChangeListener(this._onStoreChange);

  },

  render: function() {
    let heading = (this.state.fetching) ? 
      this.state.message :
      `${this.state.info.season} ${this.state.info.raceName}`;

    return (
      <div style={{width: "100%", overflow: "hidden"}}>
        <button onClick={this._previous}>Previous</button>
        <button onClick={this._next}>Next</button>

        <h1>{heading}</h1>
        <F1MapView />
        <F1ResultsView />
      </div>
    );
  },

  _onStoreChange: function() {
    this.setState({
      fetching: F1Store.fetching(),
      message: F1Store.message(),
      info: F1Store.raceInfo()
    });
  },

  _previous: function() {
    let previousRace = (this.state.info.round - 1) ? this.state.info.round - 1 : 1;
    F1Actions.fetch(2014, previousRace);
  },
  _next: function() {
    let nextRace = (this.state.info.round + 1 < 19) ? this.state.info.round + 1 : 19;
    F1Actions.fetch(2014, nextRace);  }
});
