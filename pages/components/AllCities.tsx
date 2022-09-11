import NavigationBar from "./NavigationBar"
import Footer from "./Footer"
import { FormEvent, useState } from "react";
import AddAndSearchCity from "./AddAndSearchCity";
import FiveDaysForecast from "./FiveDaysForecast"
interface IWeatherInfo {
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
const AllCities = () => {
    const [enteredCity, setEnteredCity] = useState("");
    const [cities, setCities] = useState<Array<IWeatherInfo>>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearchCity, setIsSearchCity] = useState(false);
    const apiKey = `${process.env.API_KEY}`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&appid=${apiKey}&units=metric`
    const [isFiveDaysForecast, setIsFiveDaysForecast] = useState(false);
    const [fiveDaysForecastURL, setFiveDaysForecastUrl] = useState("");
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("");
    const [city, setCity] = useState("");
    const addCity = async (event: FormEvent) => {
        event.preventDefault();
        const response = await fetch(url);
        var data = await response.json();
        const { main, name, sys, weather, id, coord } = data;
        console.log(data)
        const weatherInfo: IWeatherInfo = {
            name: name.toLowerCase(),
            temperature: Math.round(main.temp),
            country: sys.country,
            iconUrl: `http://openweathermap.org/img/wn/${weather[0]["icon"]}@4x.png`,
            description: weather[0]["description"],
            longitude: coord.lon,
            latitude: coord.lat,
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`,
            feelsLike: main.feels_like,
            humidity: main.humidity,
            pressure: main.pressure
        }
        console.log(weatherInfo);
        if (!JSON.stringify(cities).includes(enteredCity.toLocaleLowerCase()) && cities.length < 20) {
            setCities([...cities, weatherInfo]);
        }
        console.log(JSON.stringify(cities.length))
    }
    const maximumCity = 5
    const currentCity = cities.filter((_city, index) =>{
       return index >= ((currentPage - 1) * maximumCity) && index <= (currentPage * maximumCity) - 1
    })
    const foundCity = currentCity.filter((city) => {
            return city.name.toLowerCase() === enteredCity.toLowerCase()
        });

        const closeFiveDaysForecasts = () => {
            setIsFiveDaysForecast(false);
        }
    const searchCity = (event: FormEvent) => {
        event.preventDefault();
        console.log(foundCity)
        setIsSearchCity(true)
    }
    const displayFiveDaysForecast = (city) => {
        console.log(city)
        setCity(city)
        setIsFiveDaysForecast(true);
        if (isSearchCity) {
            setIsSearchCity(false)
        }
    }

    const previousCities = () => {
        if ((currentPage - 1) !== 0) {
            setCurrentPage(currentPage - 1)
            console.log(currentPage)
        }
    }
    const nextCities = () => {
        if (cities.length > currentPage * 5) {
            setCurrentPage(currentPage + 1)
            console.log(cities.length > currentPage * 5)
        }
    }
    if (!cities.length) {
        return (
            <>
                <section className="main-section">
                    <NavigationBar />
                    <section className="main-contents">
                        <AddAndSearchCity addCity={addCity} setEnteredCity={setEnteredCity} searchCity={searchCity} enteredCity={enteredCity} />
                        <div className="card-container">
                            <div className="card no-city-card">
                                <h1>You have not added any city yet</h1>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </section>
            </>
        )
    }
    if (isFiveDaysForecast) {
        return (
            <>
                <FiveDaysForecast city={city} fiveDaysForecastURL={fiveDaysForecastURL} lon={lon} lat={lat} closeFiveDaysForecasts={closeFiveDaysForecasts} />
            </>
        )
    }
    return (
        <>
            <section className="main-section">
                <NavigationBar />
                <section className="main-contents">
                <AddAndSearchCity addCity={addCity} setEnteredCity={setEnteredCity} searchCity={searchCity} enteredCity={enteredCity} />
                <div className="card-container">
                    {

                        currentCity.map((city, index) => {
                            return (
                                <div key={index} onClick={() => displayFiveDaysForecast(city)} className="card">
                                    <p className="card-title">{city.name}</p>
                                    <picture className="card-image">
                                        <img src={city.iconUrl} alt={"fff"} />
                                    </picture>

                                    <h2 className="temperature">{city.temperature}<sup>o</sup><span><p className="celcius">C</p></span></h2>
                                    <p className="weather-description">{city.description}</p>
                                    <div className="more-weather-info-container">
                                        <span><p>Feels Like</p> <p>{city.feelsLike} <sup>o</sup>C</p></span>
                                        <span><p>Humidity</p> <p>{city.humidity}</p></span>
                                        <span><p>Pressure</p> <p>{city.pressure}</p></span>
                                    </div>
                                </div>)
                        })
                    }

                </div><div className="pagination-container">
                    <button  onClick={previousCities}>&larr;</button>
                    <button  onClick={nextCities}>&rarr;</button>
                </div>
                </section>
                <Footer />
            </section>
        </>
    )
}
export default AllCities