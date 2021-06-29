import React from 'react'
import weatherFunnyGif from "../../assets/img/weather_funny_gif.gif"
import "./card.css"
import * as Fa from "react-icons/fa"
export default function Card(props) {
  const { name, temp, weather, wind } = props.weatherdata
  const temperatureincelsius = Number(temp) - Number(273.15)
  var temperature
  if (temperatureincelsius.toString().split(".").length >= 2) {
    temperature = temperatureincelsius.toString().split(".")[0]
  } else {
    temperature = temperatureincelsius
  }
  return (
    <div className="card mb-3 shadow-sm bg-body rounded"  style={{ maxWidth: "540px", cursor: 'pointer' }}>
      <div className="row g-0">
        <div className="col-md-4 weatherFunnyGif" style={{ backgroundImage: `url(${weatherFunnyGif})` }}>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <div className="row weatherinfo">
              <div className="col-4 col-md-4 card-text"><Fa.FaFan /> <span className="wind" >{wind} km/h</span> </div>
              <div className="col-4 col-md-4 card-text"><Fa.FaTemperatureHigh /> <span className="temperature" >{temperature} °C</span> </div>
            </div>
            <div className="card-text mt-4"><Fa.FaCloudSunRain /> <span className="cloud" ></span>{weather}</div>

          </div>
        </div>
      </div>
    </div>
  )
}
