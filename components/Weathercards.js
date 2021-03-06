import React, { Component } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Thumbnail, Left, Right} from 'native-base';
export class Weatherone extends React.Component {
  render() {
    if (this.props.weather === 'sunny'){
      i = 'http://qvcc.edu/wp-content/uploads/2017/03/Sun-PNG-Image.png';
    }else if (this.props.weather === 'rain' || this.props.weather === 'thunderstorms' || this.props.weather === 'showers'){
      i = 'https://thetomatos.com/wp-content/uploads/2017/04/dark-cloud-rainy-clipart.png';
    }else {
      i = 'http://www-scf.usc.edu/~xli430/forecast/cloudy.png';
    }
    return (
          <Card style={{backgroundColor: 'black'}}>
            <CardItem header>
              <Left>
                <Body>
                  <Text style={styles.bodyBigWhite}>{this.props.name}</Text>
                  <Text note>{this.props.date}</Text>
                </Body>
              </Left>
              <Right>
                <Button
                  onPress={() => { Alert.alert(this.props.location, this.props.details)}}
                  title = '+'
                  color = 'orange'
                />
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail large square source={{uri: i}} />
              </Left>
              <Right>
                <Body>
                  <Text>{'\n'}</Text>
                  <Text style={styles.bodyRed}>Hi: {this.props.high}</Text>
                  <Text style={styles.bodyBlue}>Lo: {this.props.low}</Text>
                </Body>
              </Right>
            </CardItem>
            <CardItem>
            <Left>
              <Text>{this.props.weather}</Text>
            </Left>
            </CardItem>
          </Card>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    fontFamily: 'normal'
  },
  headerWhite: {
    color: 'white',
    fontWeight: 'bold',
    fontSize :30,
  },
  bodyBigBlack:{
    color: 'black',
    fontSize: 24,
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
