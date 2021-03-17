import React, {useState} from 'react';
import CityWeather from './CityWeather';

const WeatherApp = () => {
    const [cityName, setCityName] = useState('London')
    const [cityNameForWeather, setCityNameForWeather] = useState('London')
    
    const changeCity = (e)=>{
        //e.preventDefault();
        setCityName(e.target.value)
    }

    const citysearch = (e)=>{
        setCityNameForWeather(cityName);
        e.preventDefault()
    }

    
        return(
            <div className="container">
                <CityWeather cityName={cityNameForWeather} />
                <div className="row justify-content-center">
                    <form onSubmit={citysearch}>
                        <input type="text" value={cityName} onChange={changeCity} />
                        <input type="submit" className="btn btn-primary" value="Search!" />
                    </form>
                </div>
            </div>
        )

}

export default WeatherApp;