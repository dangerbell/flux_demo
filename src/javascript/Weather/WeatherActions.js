const Dispatcher = require('../Dispatcher');

module.exports = {
  makeBetter(city) {
    Dispatcher.dispatch({
      type: "embetter",
      city: city
    });
  },

  makeWorse(city) {
    Dispatcher.dispatch({
      type: "worsify",
      city: city
    });
  }
};
