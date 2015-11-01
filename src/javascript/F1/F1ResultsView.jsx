const React = require('react');
const F1Store = require('./F1Store');

module.exports = React.createClass({
  displayName: "F1ResultsView",
  getInitialState: function() {
    return {
      results: F1Store.results()
    };
  },
  
  componentWillMount: function() {
    F1Store.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount: function() {
    F1Store.removeChangeListener(this._onStoreChange);

  },

  render: function() {

    const rows = this.state.results.map( (data, index) => {
      let className = (index % 2) ? "even" : "odd";
      return(
        <tr className={className}>
          <td>{data.position}</td>
          <td>{data.number}</td>
          <td>{data.driver}</td>
          <td>{data.constructor}</td>
          <td>{data.laps}</td>
          <td>{data.grid}</td>
          <td>{data.time}</td>
          <td>{data.status}</td>
          <td>{data.points}</td>
        </tr>
      );
    });

    return (
      <div>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>No</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Laps</th>
            <th>Grid</th>
            <th>Time</th>
            <th>Status</th>
            <th>Points</th>
          </tr>            
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      </div>
    );
  },

  _onStoreChange: function() {
    this.setState({results: F1Store.results()});
  }
});
