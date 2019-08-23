import React, { Component } from "react";

import { StyleSheet, Text, View, TextInput, ImageBackground } from "react-native";

import Forecast from "./Forecast";
import OpenWeatherMap from "./open_weather_map";
//Standard import statements that are required in a react-native project, as well as forecast

class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = { zip: "", forecast: null };
  }

 // The end result which we want, is that the user is able to enter a zip code
 // of some kind that will display the local temperature. Here we have created
 // a component class that will set the initial state values, by mutating the
 // this.state variable in the constructor method

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    OpenWeatherMap.fetchForecast(zip).then(forecast => {
      this.setState({ forecast: forecast });
    // Known as fat-arrow syntax, this ensures that our callback is properly bound
    // to the component instance
    });
  };

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <Forecast
          main={this.state.forecast.main}
          description={this.state.forecast.description}
          temp={this.state.forecast.temp}
        />
      );
    }
      
      // This is in line with this.state that we worked with before,
    // simply the zip that we entered will be displayed (Applies to the code below)
    // We have also added code to put in a background image onto
    // the app, with the use of the component ImageBackground
    // There are a few more additional styling elements utilized
    // such as styles.overlay, styles.row, and styles.mainText which we have not covered in detail yet
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./flowers.png")} style={{width: '100%', height: '100%'}}
          resizeMode="cover"
          style={styles.backdrop}
        >
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  onSubmitEditing={this._handleTextChange}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
            {content}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const baseFontSize = 16;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 30 },
  backdrop: { flex: 1, flexDirection: "column" },
  overlay: {
    paddingTop: 5,
    backgroundColor: "#000000",
    opacity: 0.5,
    flexDirection: "column",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    padding: 30
  },
  zipContainer: {
    height: baseFontSize + 10,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: { flex: 1, flexBasis: 1, width: 50, height: baseFontSize },
  mainText: { fontSize: baseFontSize, color: "#FFFFFF" }
});

export default WeatherProject;