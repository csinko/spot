import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Thumbnail, Left, Right } from 'native-base';
import { EventEmitter } from 'fbemitter';

import { Weatherone } from './components/Weathercards';

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
                    events: this.state.events.concat(evt)
                });
            });

        emitter.addListener('calendar', evts => {
            this.getWeather(evts);
        });
        
        console.log("Getting Calendar");
        this.getCalendar();

    }

    getCalendar() {
        fetch('https://www.googleapis.com/calendar/v3/calendars/tsm4vq1o9a43okt4nspiht7s5g@group.calendar.google.com/events?key=AIzaSyDg2B2WDtBtJb3yJAxlDhF1dnVJzBwERfk')
        .then((response) => response.json())
        .then((responseJson) => {
            let events = new Array();
            responseJson.items.map(function(evt) {
                events.push({
                    location: evt.location,
                    date:   evt.start.dateTime,
                    name:   evt.summary,
                    description: evt.description
                });
            });
            emitter.emit('calendar', events);
        })
    }


      getWeather(events) {
          console.log("Getting Weather");

          events.map(function(evt) {
              address = evt.location.replace(/ /g, '');
              const API_KEY = "AIzaSyDg2B2WDtBtJb3yJAxlDhF1dnVJzBwERfk";
              fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ address + '&key=' + API_KEY)
              .then((response) => response.json())
              .then((responseJson) => {
                  var zipCode;
                  responseJson.results[0].address_components.map(function(addr) {
                        console.log(addr.long_name);
                      addr.types.map(function(type) {
                          if (type === "postal_code") {
                             zipCode = addr.long_name;
                          }
                      });
                  });
                  console.log(zipCode);
                  fetch('http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=HackPSU2017&q=' + zipCode)
                  .then((response2) => response2.json())
                  .then((responseJson2) => {
                      let cityKey = responseJson2[0].ParentCity.Key;
                      fetch('http://dataservice.accuweather.com/forecasts/v1/daily/15day/' + cityKey + '?apikey=HackPSU2017')
                      .then((response3) => response3.json())
                      .then((responseJson3) => {
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
        <Container style={{backgroundColor: 'dimgray'}}>
            <Content>
                <Header style={{backgroundColor: 'palegreen', marginTop: 24}}>
                    <Left>
                        <Thumbnail source={require('./assets/logofour.png')} />
                        <Body>
                            <Text style={styles.bodyBigBlack}>Spot</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text style={styles.bodyBigBlack}>Spot</Text>
                    </Right>
                </Header>
                <ScrollView>
                    {this.state.events.map((x) => <Weatherone name={x.name} location={x.location} date={x.date} weather={x.weather} high={x.high} low={x.low} details={x.description} />)}
                </ScrollView>
            </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerWhite: {
    padding:0,
    color: 'white',
    fontWeight: 'bold',
    fontSize :30,
  },
  bodyBigBlack:{
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bodyBlack:{
    color: 'black',
    fontSize: 18,
  },
  bodyBlue:{
    color: 'cyan',
    fontSize: 18,
  },
  bodyRed:{
    color: 'crimson',
    fontSize: 18,
  }
});
