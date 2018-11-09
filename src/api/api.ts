import { IWeatherDetails } from './weather-details';
import { apiId } from 'src/constants';

export function fetchLocation(search: string): Promise<IWeatherDetails> {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiId}`)
      .then(res => {
        return res.json().then(body => ({ ok: res.ok, body }));
      })
      .then(res => {
        if (!res.ok) {
          throw new Error((res.body as any).message);
        }
        return res.body;
      })
  }

export function fetchLocationFromCoords(lat: number, long: number): Promise<IWeatherDetails> {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiId}`)
        .then(res => res.json())
}
