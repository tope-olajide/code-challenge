import { useEffect, useState } from "react";
import TwelveHoursForecast from "./TwelveHoursForecast";
import Loader from "./Loader";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { IFiveDaysForecastDataObjects, IFiveDaysForecastProps } from "../types";


const FiveDaysForecast = (props: IFiveDaysForecastProps) => {
    const [data, setData] = useState<Array<IFiveDaysForecastDataObjects>>([]);
    const [day, setDay] = useState(0);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const FiveDaysForecastUrl = props.city!.url
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const data = await fetch(FiveDaysForecastUrl);
            const response = await data.json();
            setIsLoading(false)
            setData(response.daily);
            console.log(response.daily)
        }
        fetchData()
            .catch(() => {
                setIsLoading(false)
                setIsError(true)
            });
    }, [FiveDaysForecastUrl])

    const [isTwelveHoursForecast, setIsTwelveHoursForecast] = useState(false);
    const displayTwelveHoursForecast = (date: number) => {
        setDay(date)
        setIsTwelveHoursForecast(true);
    }
    const closeTwelveHoursForecasts = () => {
        setIsTwelveHoursForecast(false);
    }
    if (isLoading) {
        return (
            <>
                <section className="main-section">
                    <NavigationBar />
                    <section className="main-contents">
                        <button className="back-button" onClick={props.closeFiveDaysForecasts}>Back</button>
                        <Loader />
                    </section>
                    <Footer />
                </section>
            </>
        )
    }
    if (isError) {
        return (
            <>
                <section className="main-section">
                    <NavigationBar />
                    <section className="main-contents">
                        <button className="back-button" onClick={props.closeFiveDaysForecasts}>Back</button>
                        <div className="card-container">
                            <div className="card no-city-card">
                                <h1>Network Error ⚠️</h1>
                                <p>Unable To Fetch Forecast 😞</p>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </section>
            </>
        )
    }
    if (isTwelveHoursForecast) {
        return (
            <>
                <TwelveHoursForecast
                    twelveHoursForecastURL={`https://api.openweathermap.org/data/2.5/forecast?lat=${props.city!.latitude}&lon=${props.city!.longitude}&appid=${process.env.API_KEY}&units=metric`}
                    closeTwelveHoursForecasts={closeTwelveHoursForecasts}
                    day={day}
                    cityName={props.city!.name}
                />
            </>
        )
    }
    return (
        <>
            <NavigationBar />
            <section className="main-container">
                <section className="main-contents">
                    <button className="back-button" onClick={props.closeFiveDaysForecasts}>Back</button>

                    <h1 className="city-name">  5-day weather forecast - <b>{props.city!.name}</b>  </h1>

                    <section className="card-container">
                        {
                            data.slice(0, 5).map((day, index) => {
                                return (
                                    <div key={index} onClick={() => displayTwelveHoursForecast(day.dt)} className="card">
                                        <p className="card-title">{day.name}</p>
                                        <h3>{new Date(day.dt * 1000).toLocaleDateString("en", { weekday: "long" })}</h3>
                                        <picture className="card-image">
                                            <img src={`http://openweathermap.org/img/wn/${day.weather[0]["icon"]}@4x.png`} alt="" />
                                        </picture>
                                        <h2 className="temperature">{Math.round(day.temp.day)}<sup>o</sup><span><p className="celcius">C</p></span></h2>
                                        <p className="weather-description">{day.weather[0]["description"]}</p>
                                    </div>)
                            })
                        }
                    </section></section>
                <Footer />
            </section>
        </>
    )
}

export default FiveDaysForecast