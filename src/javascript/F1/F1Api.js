const request = require('superagent');

module.exports = window.api = {

  fetch: function(year, race, callback) {
    request
      .get(`http://ergast.com/api/f1/${year}/${race}/results.json`)
      .end( callback );

  }

};
