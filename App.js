import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EventEmitter } from 'fbemitter';

const API_Key = "HackPSU2017";

    var emitter = new EventEmitter();

export default class App extends React.Component {

  constructor(){
    super();
    this.getWeather=this.getWeather.bind(this);
    this.state = {
        events: new Array()
    }
  }

    componentDidMount() {
        emitter.addListener('event', evt => {
                this.setState({
                    events: [].concat(evt)
                });
            });
        this.getWeather([{
            name: "Event 1",
            date: "2017-11-07T15:00:00-05:00",
            description: "My Event",
            location: "293 E Exchange St, Akron, OH 44304, USA"
        }]);

    }


      getWeather(events) {
          console.log("Getting Weather");
        
          events.map(function(evt) {
              address = evt.location.replace(/ /g, '');
              const API_KEY = "AIzaSyA-AfLMIf-k0l4IEmktj4Egjz74AN-gQ2I";
              fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ address + '&key=' + API_KEY)
              .then((response) => response.json())
              .then((responseJson) => {
                  let zipCode = responseJson.results[0].address_components[7].long_name; 
                  console.log(zipCode);
                  fetch('http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=HackPSU2017&q=' + zipCode)
                  .then((response2) => response2.json())
                  .then((responseJson2) => {
                      let cityKey = responseJson2[0].ParentCity.Key;
                      fetch('http://dataservice.accuweather.com/forecasts/v1/daily/15day/' + cityKey + '?apikey=HackPSU2017')
                      .then((response3) => response3.json())
                      .then((responseJson3) => {
                          console.log(responseJson3);
                          let dayWeather = responseJson3.DailyForecasts[0];
                          evt.weather = dayWeather.Day.IconPhrase;
                          evt.high = dayWeather.Temperature.Maximum.Value;
                          evt.low = dayWeather.Temperature.Minimum.Value;
                          emitter.emit('event', evt);
                          
                      })
                    .catch((error) => {
                        console.error(error);
                    });
                  })
                  .catch((error) => {
                      console.error(error);
                  });
              })
              .catch((error) => {
                  console.error(error);
              });
            
          });
      }

  render() {
      console.log(this.state.events);
    
    return (
      <View style={styles.container}>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
