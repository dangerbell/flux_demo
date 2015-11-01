let React = require('react');
let WeatherView = require('./src/javascript/Weather/WeatherView.jsx');
let F1View = require('./src/javascript/F1/F1View.jsx');
let F1Actions = require('./src/javascript/F1/F1Actions.js');

F1Actions.fetch(2014, 1, () => {

  React.render(<F1View />, document.getElementById("mount"));

});

// React.render(<WeatherView />, document.getElementById("mount"));
