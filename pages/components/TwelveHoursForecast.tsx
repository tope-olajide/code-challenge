import { useEffect, useState } from "react"
import NavigationBar from "./NavigationBar";
import Loader from "./Loader";

const TwelveHoursForecast = (props) => {
    const [data, setData] = useState<Array<object>>([])

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
            //console.log(response.hourly);
            /* const twelveHours = response.hourly.map((eachHour)=>{
                const dateObject = new Date(eachHour.dt*1000)
                        return dateObject.toLocaleString("en-US", {hour: "numeric"})
            }) */
            const twelveHours = response.list.filter((eachHour) => {
                if (new Date(props.day * 1000).toLocaleDateString("en-US") === new Date(eachHour.dt * 1000).toLocaleDateString("en-US")) {
                    return new Date(eachHour.dt * 1000).toLocaleString("en-US")
                }
            })
            setData(twelveHours);
            console.log(twelveHours);
        }
        fetchData()
            .catch(() => {
                setIsLoading(false)
                setIsError(true)
            });
    }, [props.twelveHoursForecastURL, props.day])

    if (isLoading) {
        return (
            <>
                <NavigationBar />
                <button className="back-button" onClick={props.closeFiveDaysForecasts}>Back</button>
                <section className="main-container">
                    <Loader />
                </section>

            </>

        )
    }
    if (isError) {
        return (
            <>
                <NavigationBar />
                <section className="main-container">
                    <button onClick={props.closeFiveDaysForecasts}>Back</button>
                    <h1>
                        Error
                    </h1>
                </section>
            </>
        )

    }
    return (
        <>
            <NavigationBar />
            <section className="main-container">
                <div className="back-button-and-city-name-container">
                    <button className="back-button" onClick={props.closeTwelveHoursForecasts}>&larr;</button>
                    <h1 className="city-name"> 12 hour forecast View for {new Date(props.day * 1000).toLocaleDateString("en", { weekday: "long" })} - <b>{props.city}</b> </h1>
                    <h1></h1> <h1></h1>
                </div>
                <section className="card-container">
                    {
                        data.slice(0, 5).map((city: any, index) => {
                            return (
                                <div key={index} className="card">
                                    <h3 className="card-title">{new Date(city.dt * 1000).toLocaleTimeString("en-US")}</h3>
                                    <picture>
                                        <img style={{ "color": "green" }} src={` http://openweathermap.org/img/wn/${city.weather[0]["icon"]}@4x.png`} alt="" />
                                        <h2 className="temperature">{Math.round(city.main.temp)}<sup>o</sup><span><p className="celcius">C</p></span></h2>
                                    </picture>

                                    <p className="weather-description">{city.weather[0]["description"]}</p>
                                </div>)
                        })
                    }
                </section></section>
        </>
    )
}

export default TwelveHoursForecast