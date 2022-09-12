import { useEffect, useState } from "react"
import NavigationBar from "./NavigationBar";
import Loader from "./Loader";
import Footer from "./Footer";
import { ICityInfo, ITwelveHoursForecastProps } from "../types";

const TwelveHoursForecast = (props:ITwelveHoursForecastProps) => {
    const [data, setData] = useState<Array<ICityInfo>>([])

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {

        const fetchData = async () => {
            // console.log(props.day)
            setIsLoading(true)
            const data = await fetch(props.twelveHoursForecastURL);
            const response = await data.json();
            console.log(`${process.env.API_KEY}`)
            setData(response);

            setIsLoading(false);
 
            const twelveHoursForecast = response.list.filter((eachHour:ICityInfo) => {
                if (new Date(props.day * 1000).toLocaleDateString("en-US") === new Date(eachHour.dt * 1000).toLocaleDateString("en-US")) {
                    return new Date(eachHour.dt * 1000).toLocaleString("en-US")
                }
            })
            setData(twelveHoursForecast);
            console.log(twelveHoursForecast);
        }
        fetchData()
            .catch(() => {
                setIsLoading(false)
                setIsError(true)
            });
    }, [props.twelveHoursForecastURL, props.day])

    if (isLoading) {
        return (
            <><section className="main-container">
                <NavigationBar />
                <button className="back-button" onClick={props.closeTwelveHoursForecasts}>Back</button>
                <section className="main-contents">
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
                    <NavigationBar /><button className="back-button" onClick={props.closeTwelveHoursForecasts}>Back</button>
                    <section className="main-contents">

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
    return (
        <>

            <section className="main-container"><NavigationBar />
                <div className="main-contents">
                    <button className="back-button" onClick={props.closeTwelveHoursForecasts}>Back</button>
                    <h1 className="city-name"> 12 hour forecast View for {new Date(props.day * 1000)
                        .toLocaleDateString("en", { weekday: "long" })} - <b>{props.cityName}</b> </h1>
                    <section className="card-container">
                        {
                            data.slice(0, 5).map((cityInfo, index) => {
                                return (
                                    <div key={index} className="card">
                                        <h3 className="card-title">{new Date(cityInfo.dt * 1000).toLocaleTimeString("en-US")}</h3>
                                        <picture>
                                            <img src={` http://openweathermap.org/img/wn/${cityInfo.weather[0]["icon"]}@4x.png`} alt="" />
                                            <h2 className="temperature">{Math.round(cityInfo.main.temp)}<sup>o</sup><span><p className="celcius">C</p></span></h2>
                                        </picture>

                                        <p className="weather-description">{cityInfo.weather[0]["description"]}</p>
                                    </div>)
                            })
                        }
                    </section>
                </div>
                <Footer />
            </section>
        </>
    )
}

export default TwelveHoursForecast