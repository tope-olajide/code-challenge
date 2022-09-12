import { FormEvent } from "react";

export interface IAddAndSearchCityProps {
    addCity(event: FormEvent): Promise<void>;
    searchCity(event: FormEvent): void;
    enteredCity: string;
    setEnteredCity(city: string): void;
    isAddingCity: boolean
    isAddingCityError: boolean
}

export interface IWeatherInfo {
    name: string;
    temperature: number;
    country: string;
    iconUrl: string;
    description: string;
    longitude: number;
    latitude: number;
    url: string;
    feelsLike: number;
    humidity: number;
    pressure: number;
}

export interface IFiveDaysForecastProps {
    closeFiveDaysForecasts(): void;
    city: IWeatherInfo | undefined;
}

export interface IFiveDaysForecastDataObjects {
    dt: number;
    name: string;
    weather: [
        {
            icon: string,
            description: string
        }
    ];
    temp: {
        day: number
    }
}
export interface ITwelveHoursForecastProps {
    twelveHoursForecastURL: string;
    day: number;
    closeTwelveHoursForecasts(): void
    cityName: string
}

export interface ICityInfo {
    dt: number;
    main: {
        temp: number
    }
    weather: [
        {
            icon: string,
            description: string;
        }
    ]
}