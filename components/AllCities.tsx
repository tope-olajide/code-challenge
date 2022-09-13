import NavigationBar from "./NavigationBar"
import Footer from "./Footer"
import { FormEvent, useEffect, useState } from "react";
import AddAndSearchCity from "./AddAndSearchCity";
import FiveDaysForecast from "./FiveDaysForecast"
import { IWeatherInfo } from "../types";
import SearchCityResult from "./SearchCityResult";

const AllCities = () => {
    const [enteredCity, setEnteredCity] = useState("");
    const [cities, setCities] = useState<Array<IWeatherInfo>>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearchCity, setIsSearchCity] = useState(false);
    const [isAddingCity, setIsAddingCity] = useState(false);
    const [addCityError, setAddCityError] = useState("");
    const [isPaginationActive, setIsPaginationActive] = useState(false);
    const [isMaximumCity, setIsMaximumCity] = useState(false);

    useEffect(() => {
        if (cities.length >= 5) {
            setIsPaginationActive(true)
        }
        if (cities.length === 20) {
            setIsMaximumCity(true)
        }

    }, [cities.length])
    const apiKey = `${process.env.API_KEY}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&appid=${apiKey}&units=metric`
    const [isFiveDaysForecastActive, setIsFiveDaysForecastActive] = useState(false);
    const [city, setCity] = useState<IWeatherInfo>();

    const addCity = async (event: FormEvent) => {
        event.preventDefault();
        const duplicateCity = cities.filter((eachCity) => {
            return eachCity.name.toLowerCase() === enteredCity.toLowerCase()
        })
        if (duplicateCity.length) {
            setAddCityError(`⚠️${enteredCity.toUpperCase()} has already been added`)
        }
        else if (!enteredCity) {
            setAddCityError("⚠️You have not entered any city⚠️");
        }

        else if (isMaximumCity) {
            setAddCityError("⚠️You can only add up to 20 cities⚠️");
        }
        else {
            try {
                setIsAddingCity(true);
                setAddCityError("");
                const response = await fetch(url);
                const data = await response.json();
                const { main, name, sys, weather, coord } = data;
                if (data.message) {
                    setIsAddingCity(false);
                    return setAddCityError(`⚠️${data.message}⚠️`);
                }
                const weatherInfo: IWeatherInfo = {
                    name: name.toLowerCase(),
                    temperature: Math.round(main.temp),
                    country: sys.country,
                    iconUrl: `https://openweathermap.org/img/wn/${weather[0]["icon"]}@4x.png`,
                    description: weather[0]["description"],
                    longitude: coord.lon,
                    latitude: coord.lat,
                    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`,
                    feelsLike: main.feels_like,
                    humidity: main.humidity,
                    pressure: main.pressure
                }

                setCities([...cities, weatherInfo]);
                setIsAddingCity(false);
                setEnteredCity("")
                setAddCityError("")
            }
            catch (error: any) {
                setIsAddingCity(false);
                if (error.message) {
                    setAddCityError(`⚠️${error.message}⚠️`);
                }

            }

        }
    }
    const maximumCity = 5
    const currentCity = cities.filter((_city, index) => {
        return index >= ((currentPage - 1) * maximumCity) && index <= (currentPage * maximumCity) - 1
    })
    const foundCity = currentCity.filter((city) => {
        return city.name.toLowerCase() === enteredCity.toLowerCase()
    });

    const closeFiveDaysForecasts = () => {
        setIsFiveDaysForecastActive(false);
    }
    const searchCity = (event: FormEvent) => {
        event.preventDefault();
        if (cities.length) {
            setAddCityError("");
            setIsSearchCity(true);
        }

    }
    const displayFiveDaysForecast = (city: IWeatherInfo) => {
        if (isSearchCity) {
            setIsSearchCity(false);
        }
        setCity(city);
        setIsFiveDaysForecastActive(true);

    }
    const previousCities = () => {
        if ((currentPage - 1) !== 0) {
            setCurrentPage(currentPage - 1);
        }
    }
    const nextCities = () => {
        if (cities.length > currentPage * 5) {
            setCurrentPage(currentPage + 1)
        }
    }
    const closeCity = () => {
        setIsSearchCity(false)
    }
    if (!cities.length) {
        return (
            <>
                <section className="main-section">
                    <NavigationBar />
                    <section className="main-contents">
                        <AddAndSearchCity addCity={addCity} setEnteredCity={setEnteredCity} searchCity={searchCity} enteredCity={enteredCity} isAddingCity={isAddingCity} addCityError={addCityError} />
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
    if (isSearchCity) {
        return (
            <>
                <SearchCityResult closeCity={closeCity} displayFiveDaysForecast={displayFiveDaysForecast} foundCity={foundCity} />
            </>
        )
    }
    if (isFiveDaysForecastActive) {
        return (
            <>
                <FiveDaysForecast city={city} closeFiveDaysForecasts={closeFiveDaysForecasts} />
            </>
        )
    }
    return (
        <>
            <section className="main-section">
                <NavigationBar />
                <section className="main-contents">
                    <AddAndSearchCity addCity={addCity} setEnteredCity={setEnteredCity} searchCity={searchCity} enteredCity={enteredCity} isAddingCity={isAddingCity} addCityError={addCityError} />
                    <div className="card-container">
                        {
                            currentCity.map((city, index) => {
                                return (
                                    <div key={index} onClick={() => displayFiveDaysForecast(city)} className="card">
                                        <p className="card-title">{city.name}</p>
                                        <picture className="card-image">
                                            <img src={city.iconUrl} alt={""} />
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
                    </div><div className="pagination-container" style={isPaginationActive ? { display: "flex" } : { display: "none" }}>
                        <button onClick={previousCities}>&larr;</button>
                        <button onClick={nextCities}>&rarr;</button>
                    </div>
                </section>
                <Footer />
            </section>
        </>
    )
}
export default AllCities