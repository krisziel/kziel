var airports = {
  JFK:{
    iata:"JFK",
    name:"John F. Kennedy International Airport",
    city:"New York City",
    country:"United States",
    utc:-4,
    coordinates:{
      latitude:40.642335,
      longitude:-73.78817
    }
  },
  DEN:{
    iata:"DEN",
    name:"Denver International Airport",
    city:"Denver",
    country:"United States",
    utc:-6,
    coordinates:{
      latitude:39.851382,
      longitude:-104.673098
    }
  },
  SIN:{
    iata:"SIN",
    name:"Changi International Airport",
    city:"Singapore",
    country:"Singapore",
    utc:+8,
    coordinates:{
      latitude:1.361173,
      longitude:103.990201
    }
  },
  HKG:{
    iata:"HKG",
    name:"Hong Kong International Airport",
    city:"Hong Kong",
    country:"Hong Kong",
    utc:+8,
    coordinates:{
      latitude:22.315248,
      longitude:113.93649
    }
  },
  NRT:{
    iata:"NRT",
    name:"Narita International Airport",
    city:"Tokyo",
    country:"Japan",
    utc:+9,
    coordinates:{
      latitude:35.773213,
      longitude:140.387443
    }
  },
  LAX:{
    iata:"LAX",
    name:"Los Angeles International Airport",
    city:"Los Angeles",
    country:"United States",
    utc:-7,
    coordinates:{
      latitude:33.943399,
      longitude:-118.408279
    }
  },
  SFO:{
    iata:"SFO",
    name:"San Francisco International Airport",
    city:"San Francisco",
    country:"United States",
    utc:-7,
    coordinates:{
      latitude:37.615215,
      longitude:-122.389881
    }
  }
}
var trips = [
  {
    name:"Singapore Round One",
    begin:{
      date:"08/28/2015",
      time:"8:00",
      airport:"SFO"
    },
    end:{
      date:"08/31/2015",
      time:"19:00",
      airport:"SFO"
    },
    flights:[
      {
        flight:869,
        airline:"UA",
        origin:{
          airport:"SFO",
          date:"08/28/2015",
          time:"13:30"
        },
        destination:{
          airport:"HKG",
          date:"08/29/2015",
          time:"18:10"
        },
        class:"Economy Plus",
        seat:"25A",
        aircraft:"Boeing 747-400"
      },
      {
        flight:895,
        airline:"UA",
        date:"08/29/2015",
        origin:{
          airport:"HKG",
          date:"08/29/2015",
          time:"20:25"
        },
        destination:{
          airport:"SIN",
          date:"08/30/2015",
          time:"00:20"
        },
        class:"Economy Plus",
        seat:"30A",
        aircraft:"Boeing 777-200ER"
      },
      {
        flight:804,
        airline:"UA",
        origin:{
          airport:"SIN",
          date:"08/31/2015",
          time:"6:10"
        },
        destination:{
          airport:"NRT",
          date:"08/31/2015",
          time:"14:20"
        },
        class:"Economy Plus",
        seat:"30A",
        aircraft:"Boeing 777-200ER"
      },
      {
        flight:33,
        airline:"UA",
        origin:{
          airport:"NRT",
          date:"08/31/2015",
          time:"17:00"
        },
        destination:{
          airport:"LAX",
          date:"08/31/2015",
          time:"11:10"
        },
        class:"Economy Plus",
        seat:"23A",
        aircraft:"Boeing 787-9"
      },
      {
        flight:444,
        airline:"UA",
        origin:{
          airport:"LAX",
          date:"08/31/2015",
          time:"13:25"
        },
        destination:{
          airport:"SFO",
          date:"08/31/2015",
          time:"14:51"
        },
        class:"Economy Plus",
        seat:"7F",
        aircraft:"Airbus A320"
      }
    ]
  },
  {
    name:"Singapore Round Two",
    begin:{
      date:"09/04/2015",
      time:"6:00",
      airport:"SFO"
    },
    end:{
      date:"09/06/2015",
      time:"19:00",
      airport:"SFO"
    },
    flights:[
      {
        flight:1956,
        airline:"UA",
        origin:{
          airport:"SFO",
          date:"09/04/2015",
          time:"8:30"
        },
        destination:{
          airport:"LAX",
          date:"09/04/2015",
          time:"10:04"
        },
        class:"Economy Plus",
        seat:"21A",
        aircraft:"Boeing 757-300"
      },
      {
        flight:32,
        airline:"UA",
        origin:{
          airport:"LAX",
          date:"09/04/2015",
          time:"11:20"
        },
        destination:{
          airport:"NRT",
          date:"09/05/2015",
          time:"15:00"
        },
        class:"Economy Plus",
        seat:"19A",
        aircraft:"Boeing 787-9"
      },
      {
        flight:803,
        airline:"UA",
        origin:{
          airport:"NRT",
          date:"09/05/2015",
          time:"17:55"
        },
        destination:{
          airport:"SIN",
          date:"09/06/2015",
          time:"00:05"
        },
        class:"Economy Plus",
        seat:"22A",
        aircraft:"Boeing 777-200ER"
      },
      {
        flight:804,
        airline:"UA",
        origin:{
          airport:"SIN",
          date:"09/06/2015",
          time:"6:10"
        },
        destination:{
          airport:"NRT",
          date:"089/06/2015",
          time:"14:20"
        },
        class:"Economy Plus",
        seat:"24A",
        aircraft:"Boeing 777-200ER"
      },
      {
        flight:33,
        airline:"UA",
        origin:{
          airport:"NRT",
          date:"09/06/2015",
          time:"17:00"
        },
        destination:{
          airport:"LAX",
          date:"09/06/2015",
          time:"11:10"
        },
        class:"Economy Plus",
        seat:"21A",
        aircraft:"Boeing 787-9"
      },
      {
        flight:444,
        airline:"UA",
        origin:{
          airport:"LAX",
          date:"09/06/2015",
          time:"13:25"
        },
        destination:{
          airport:"SFO",
          date:"09/06/2015",
          time:"14:51"
        },
        class:"Economy Plus",
        seat:"21F",
        aircraft:"Airbus A320"
      }
    ]
  }
]
