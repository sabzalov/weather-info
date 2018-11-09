export interface IWeatherDetails {
    coord: {
      lon: string;
      lat: string;
    },
    weather: {
      id: string;
      main: string;
      description: string;
      icon: string;
    }[],
    main: {
      temp: number;
      pressure: number;
      humidity: number;
      temp_min: number;
      temp_max: number;
      sea_level: number;
      grnd_level: number;
    },
    wind: {
      speed: number;
      deg: number;
    },
    id: number;
    name: string;
    sys: {
      country: string;
      sunrise: string;
      sunset: string;
    },
    clouds?: {
      all: number;
    },
    rain?: {
      ['3h']: number;
    },
    snow?: {
      ['3h']: number;
    }
  }
