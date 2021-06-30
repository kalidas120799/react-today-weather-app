import React, { Component } from 'react'
import weatherImg from "../../assets/img/weather_notification.svg"
import Card from "../../components/Card/Card"
import { weatherInfo } from "../../api/weatherapi"
export default class Weatherapp extends Component {
    constructor(props) {
        super()
        this.state = {
            weatherdata: [],
            area: '',
            popularcity: ["coimbatore", "bangalore"]
        }
    }
    componentDidMount = async () => {
        const data = []
        const { popularcity } = this.state
        for (var i = 0; i < popularcity.length; i++) {
            const weatherinfo = await weatherInfo(popularcity[i])
            if (weatherinfo !== false) {
                const { name, wind, main, weather } = weatherinfo
                const weatherdata = {
                    name: name,
                    wind: wind.speed,
                    temp: main.temp,
                    weather: weather[0].description
                }
                data.push(weatherdata)
            }

        }
        this.setState({ weatherdata: data })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    check = async () => {
        const { area, weatherdata, popularcity } = this.state
        if (popularcity.includes(area.toLowerCase())) return alert(`${area} Already Below The List`)
        const weatherinfo = await weatherInfo(area.toLowerCase())
        if (weatherinfo.message === undefined) {
            if (weatherinfo !== false) {
                const { name, wind, main, weather } = weatherinfo
                const newweatherdata = {
                    name: name,
                    wind: wind.speed,
                    temp: main.temp,
                    weather: weather[0].description
                }
                if (weatherdata.length === 3) {
                    this.setState({ weatherdata: [newweatherdata], popularcity: [...popularcity, area] })
                } else {
                    this.setState({ weatherdata: [...weatherdata, newweatherdata], popularcity: [...popularcity, area] })
                }
            }
        } else {
            alert(weatherinfo.message)
        }

    }
    render() {
        const { weatherdata, area } = this.state
        const nodata = {
            name: "Please Wait...",
            wind: 0,
            temp: 273.15,
            weather: "Please Wait..."
        }
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-6">
                        <div className='searchdiv row mt-5' >
                            <div className="col-10 col-md-10 w-75"> <input type="text" value={area} name='area' onChange={(e) => this.handleChange(e)} className="form-control" placeholder="eg (Coimbatore)" style={{ borderColor: "#3F3D56" }} /></div>
                            <div className="col-2 col-md-2"><button className='btn btn-info text-white' style={{ backgroundColor: "#6C63FF" }} onClick={this.check} >Check</button></div>
                        </div>
                        <div className='mt-5'>
                            {
                                weatherdata.length !== 0 ? weatherdata.map((data, index) => (
                                    <Card weatherdata={data} key={index} />
                                )) : <Card weatherdata={nodata} />
                            }

                        </div>
                    </div>
                    <div className="col-md-6 d-none d-md-block">
                        <div className='mt-5'>
                            <img src={weatherImg} className='img-fluid' alt="weather" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
