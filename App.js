import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'

const API_Key = "HackPSU2017";
const cityKey = "330119";

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      
      City : cityKey,
      Days : [],

    }
  }

  getZipCode(address) {
    
    var zipCode;
    addressAlt = address.replace(/ /g,'');
    const API_Key = "AIzaSyA-AfLMIf-k0l4IEmktj4Egjz74AN-gQ2I";
    const weatherAPIKey = "HackPSU2017";
    const requestURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressAlt + "&key=" + API_Key;

    axios.get(requestURL)
    .then( (response) => {

      if(response.status == 200){
        zipCode = response.data.results[0].address_components[6].long_name; 
        return zipCode;
      }
      
    })
      .catch((error) => {
        console.error(error);

  });

  }

  getCityKey(zipCode){
    console.log(zipCode);
    console.log("http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=HackPSU2017&q=" + zipCode);
    axios.get("http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=HackPSU2017&q=" + zipCode)
    .then( (response) => {

      if(response.status == 200){
        
       // weather = response.data.DailyForecasts.Day.IconPhrase;
        console.log(zipCode);
        console.log(response.data);

      }
      
    })
      .catch((error) => {
        console.error(error);

  });
  }

  getForecast(cityKey){

    const requestURL = "http://dataservice.accuweather.com/forecasts/v1/daily/15day/" + cityKey + "?apikey=" + API_Key;
    axios.get(requestURL)
    .then( (response) => {

      if(response.status == 200){
        
       // weather = response.data.DailyForecasts.Day.IconPhrase;
        console.log(response.data.DailyForecasts[0].Day.IconPhrase);

      }
      
    })
      .catch((error) => {
        console.error(error);

  });
}
  render() {
    if(this.state.Days <= 0){

      console.log(this.getZipCode("2181 Duxbury Drive"));

    }
    
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
