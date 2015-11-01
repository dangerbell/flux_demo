const Dispatcher = require('../Dispatcher');
const F1Api = require('./F1Api');

module.exports = {

  fetch(season, race, callback) {

    Dispatcher.dispatch({
      type: "RaceUpdateAction",
      message: `Fetching Season ${season} Race ${race}`
    });

    setTimeout( () => {

      F1Api.fetch(season, race, (err, res) => {

        if( res.body.MRData.RaceTable.Races[0] ) {
          Dispatcher.dispatch({
            type: "RaceUpdateSuccessAction",
            payload: res.body.MRData.RaceTable.Races[0]
          });
        } else {
          Dispatcher.dispatch({
            type: "RaceUpdateFailureAction",
            message: `Failed Fetching Season ${season} Race ${race}`
          });
        }

        if ( callback ) {
          callback();        
        }
        console.log(res.body);

      });

    }, 1000);

  }

};
