import * as React from 'react';
import Map from 'pigeon-maps'
import Overlay from 'pigeon-overlay';
import { IWeatherDetails } from 'src/api/weather-details';
import './WeatherInfo.css';

export function WeatherInfo(props: IWeatherDetails) {
    return (
        <Map className="map" center={[props.coord.lat, props.coord.lon]} zoom={12} mouseEvents={false} touchEvents={false}>
            <Overlay className="overlay" anchor={[props.coord.lat, props.coord.lon]} offset={[0, 0]}>
                <p>City: {props.name}</p>
                <p>Country Code: {props.sys.country}</p>
                <p>Temperature: {convertKelvinToCel(props.main.temp)}&#8451;</p>
                <p>{props.weather.map(item => item.description).join(', ')}</p>
            </Overlay>
        </Map>
    )
}

function convertKelvinToCel(kelvin: number): number {
    return Math.round(kelvin - 273);
}
