import * as React from 'react';
import { LocationForm } from './components/LocationForm';
import { WeatherInfo } from './components/WeatherInfo';
import { Loading } from './components/Loading';
import { IWeatherDetails } from './api/weather-details';
import { fetchLocation, fetchLocationFromCoords } from './api/api';
import './App.css';

interface IState {
  weatherInfo: IWeatherDetails | null;
  hasError: boolean;
  loading: boolean;
  errorMessage: string;
}

class App extends React.Component<any, IState>  {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: '',
      hasError: false,
      loading: false,
      weatherInfo: null,
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  public componentDidMount() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ loading: true });

        fetchLocationFromCoords(position.coords.latitude, position.coords.longitude)
          .then(location => {
            this.setState({
              hasError: false,
              errorMessage: '',
              weatherInfo: location,
              loading: false
            });
          }
        );
      })
    }
  }

  public render() {
    let messages = <span>Please enter a location</span>;
    if (this.state.hasError) {
      messages = <span className="error">{this.state.errorMessage}</span>;
    }

    return (
      <div className="container">
        <header className="header">
          <h1>Weather Locations</h1>
        </header>
        <div className="form">
          <LocationForm onLocationChange={this.handleLocationChange}/>
        </div>
        <div className="messages">
        {this.state.loading ? <Loading /> : messages}
        </div>
        {this.state.weatherInfo &&
          <div className="map">
            <WeatherInfo {...this.state.weatherInfo} />
          </div>
        }
      </div>
    );
  }

  private async handleLocationChange(newLocation: string): Promise<void> {
    this.setState({ loading: true });
    try {
      const location = await fetchLocation(newLocation);
      this.setState({
        errorMessage: '',
        hasError: false,
        weatherInfo: location,
        loading: false,
      });

    } catch(error) {
      this.setState({
        hasError: true,
        errorMessage: (error as Error).message,
        loading: false
      });
    }
  }
}

export default App;
