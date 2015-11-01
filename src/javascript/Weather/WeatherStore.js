const Dispatcher = require('../Dispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = "change";

let _cities = [
  "Edmonton",
  "Calgary",
  "Vancouver"
];

let _forecasts = {
  "Edmonton": [
    {
      date: "2015-04-02",
      high: 5,
      low: -4,
      conditions: "cloudy"
    },
    {
      date: "2015-04-03",
      high: 4,
      low: -5,
      conditions: "sunny"
    },
    {
      date: "2015-04-04",
      high: 7,
      low: -4,
      conditions: "partly cloudy"
    }
  ],
  "Calgary": [
    {
      date: "2015-04-02",
      high: 5,
      low: -4,
      conditions: "partly cloudy"
    },
    {
      date: "2015-04-03",
      high: 8,
      low: -2,
      conditions: "sunny"
    },
    {
      date: "2015-04-04",
      high: 7,
      low: -1,
      conditions: "partly cloudy"
    }
  ],
  "Vancouver": [
    {
      date: "2015-04-02",
      high: 12,
      low: 7,
      conditions: "partly cloudy"
    },
    {
      date: "2015-04-03",
      high: 11,
      low: 5,
      conditions: "rain"
    },
    {
      date: "2015-04-04",
      high: 11,
      low: 4,
      conditions: "rain"
    }
  ]
};

const _conditions = [
  "blizzard",
  "snow",
  "sleet",
  "hail",
  "rain",
  "cloudy",
  "partly cloudy",
  "sunny"
];

const randomInt = function(high) {
  return Math.round(Math.random() * high);
};

const improveConditions = function(conditions) {
  let conditionsIndex = _conditions.indexOf(conditions);
  if( conditionsIndex < _conditions.length - 1) {
    return _conditions[conditionsIndex + randomInt(_conditions.length - conditionsIndex)];
  } else {
    return _conditions[_conditions.length - 1];
  }
};

const worsenConditions = function(conditions) {
  let conditionsIndex = _conditions.indexOf(conditions);
  if( conditionsIndex > 0) {
    return _conditions[conditionsIndex - randomInt(_conditions.length - conditionsIndex)];
  } else {
    return _conditions[0];
  }
};

const makeBetter = function(forecast) {
  return forecast.map( day => {
    return {
      date: day.date,
      high: day.high + Math.floor(Math.random() * 3),
      low: day.low + Math.floor(Math.random() * 3),
      conditions: improveConditions(day.conditions)
    };
  });
};

const makeWorse = function(forecast) {
  return forecast.map( day => {
    return {
      date: day.date,
      high: day.high - Math.floor(Math.random() * 3),
      low: day.low - Math.floor(Math.random() * 3),
      conditions: worsenConditions(day.conditions)
    };
  });
};

const WeatherStore = assign({}, EventEmitter.prototype, {
  cities() {
    return _cities;
  },

  forecastFor(city) {
    return _forecasts[city];
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

    switch(action.type) {
      case "worsify": 
        _forecasts[action.city] = makeWorse(_forecasts[action.city]);
        WeatherStore.emitChange();
        break;
      case "embetter":
        _forecasts[action.city] = makeBetter(_forecasts[action.city]);
        WeatherStore.emitChange();
        break;
    }
  })
});

module.exports = WeatherStore;
