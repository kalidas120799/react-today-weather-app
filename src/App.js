import React, { Component } from 'react'
import Navbar from './components/Navbar/Navbar'
import WeatherApp from "./views/Weatherapp/Weatherapp"
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
       <WeatherApp />
      </div>
    )
  }
}
