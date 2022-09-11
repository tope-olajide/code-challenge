import { useEffect, useState } from "react";
import TwelveHoursForecast from "./TwelveHoursForecast";
import Loader from "./Loader";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
const FiveDaysForecast = (props) => {
    const [data, setData] = useState<Array<object>>([]);
    const [day, setDay] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        console.log(props.city.url)
        const fetchData = async () => {
            setIsLoading(true)
            const data = await fetch(props.city.url);
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
    }, [props.city.url])

    const [isTwelveHoursForecast, setIsTwelveHoursForecast] = useState(false);
    const [twelveHoursForecastURL, setTwelveHoursForecastURL] = useState("")
    const displayTwelveHoursForecast = (url) => {
        setIsTwelveHoursForecast(true);
        const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.city.latitude}&lon=${props.city.longitude}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`
        // const ur = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&exclude=current,daily,minutely,alerts&units=metric&appid=4d8fb5b93d4af21d66a2948710284366`
        setTwelveHoursForecastURL(url2)
        setDay(url)
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
                        <button className="back-button" onClick={props.closeFiveDaysForecasts}>&larr;</button>
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
                        <button className="back-button" onClick={props.closeFiveDaysForecasts}>&larr;</button>
                        <h1>
                            Error
                        </h1>
                    </section>
                    <Footer />
                </section>
            </>
        )
    }
    if (isTwelveHoursForecast) {
        return (
            <>
                <TwelveHoursForecast twelveHoursForecastURL={`https://api.openweathermap.org/data/2.5/forecast?lat=${props.city.latitude}&lon=${props.city.longitude}&appid=${process.env.API_KEY}&units=metric`} closeTwelveHoursForecasts={closeTwelveHoursForecasts} day={day} city={props.city.name} />
            </>
        )
    }
    return (
        <>
            <NavigationBar />
            <section className="main-container">
                <section className="main-contents">
                    <button className="back-button" onClick={props.closeFiveDaysForecasts}>&larr;</button>
                    
                        <h1 className="city-name">  5-day weather forecast - <b>{props.city.name}</b>  </h1>
                    
                    <section className="card-container">
                        {
                            data.slice(0, 5).map((day: any, index) => {
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
            </section>


        </>
    )
}

export default FiveDaysForecast