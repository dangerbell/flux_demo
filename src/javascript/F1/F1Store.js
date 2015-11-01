const Dispatcher = require('../Dispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = "change";

let _fetching = false;

let _message = "";

let _raceInfo = {
  Circuit: {
    Location: {
      country: "Brazil",
      lat: "-23.7036",
      locality: "São Paulo",
      long: "-46.6997"
    },
    circuitId: "interlagos",
    circuitName: "Autódromo José Carlos Pace",
    url: "http://en.wikipedia.org/wiki/Aut%C3%B3dromo_Jos%C3%A9_Carlos_Pace"
  },
  Results: [
    {
      Constructor: {
        constructorId: "mercedes",
        name: "Mercedes",
        nationality: "German",
        url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One"
      },
      Driver: {
        code: "ROS",
        dateOfBirth: "1985-06-27",
        driverId: "rosberg",
        familyName: "Rosberg",
        givenName: "Nico",
        nationality: "German",
        permanentNumber: "6",
        url: "http://en.wikipedia.org/wiki/Nico_Rosberg"
      },
      FastestLap: {},
      Time: {
        millis: "5402555",
        time: "1:30:02.555"
      },
      grid: "1",
      laps: "71",
      number: "6",
      points: "25",
      position: "1",
      positionText: "1",
      status: "Finished"
    }
  ],
  date: "",
  raceName: "Brazilian Grand Prix",
  round: "18",
  season: "2014",
  time: "",
  url: ""
};

const F1Store = assign({}, EventEmitter.prototype, {

  raceCoordinates: function() {
    return {
      lat: parseFloat(_raceInfo.Circuit.Location.lat),
      lng: parseFloat(_raceInfo.Circuit.Location.long)
    };
  },

  raceInfo: function() {
    return {
      season: _raceInfo.season,
      round: parseInt(_raceInfo.round, 10),
      raceName: _raceInfo.raceName,
      country: _raceInfo.Circuit.Location.country,
      locality: _raceInfo.Circuit.Location.locality,
      circuitName: _raceInfo.Circuit.circuitName
    };
  },

  results: function() {
    return _raceInfo.Results
      // .sort( (a, b) => parseInt(a.position, 10) - parseInt(b.position, 10) )
      .map( data => {
      return {
        position: data.positionText,
        number: data.Driver.permanentNumber,
        driver: `${data.Driver.givenName} ${data.Driver.familyName}`,
        constructor: data.Constructor.name,
        laps: data.laps,
        grid: data.grid,
        time: (data.Time) ? data.Time.time : "",
        status: data.status,
        points: data.points
      };
    });
  },

  fetching: function() {
    return _fetching;
  },

  message: function() {
    return _message;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: Dispatcher.register(function(action) {

    console.log(action.type);

    switch(action.type) {
      case "RaceUpdateAction":
        _fetching = true;
        _message = action.message;
        F1Store.emitChange();
        break;
      case "RaceUpdateSuccessAction": 
        _fetching = false;
        _message = "";
        _raceInfo = action.payload;
        F1Store.emitChange();
        break;
      case "RaceUpdateFailureAction": 
        _fetching = false;
        _message = action.message;
        F1Store.emitChange();
        break;
    }
  })
});

module.exports = F1Store;
