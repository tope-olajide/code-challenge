import { IAllCitiesProps } from "../types"
const AllCities = (props: IAllCitiesProps) => {
    return (
        <>
                <div className="card-container">
                    {
                        props.currentCity.map((city, index) => {
                            return (
                                <div key={index} onClick={() => props.displayFiveDaysForecast(city)} className="card">
                                    <p className="card-title" data-testid="card-title">{city.name}, {city.country}</p>
                                    <picture className="card-image">
                                        <img src={city.weatherIconURL} alt={""} />
                                    </picture>
                                    <h2 className="temperature">{city.temperature}<sup>o</sup><span><p className="celcius">C</p></span></h2>
                                    <p className="weather-description">{city.description}</p>
                                    <div className="more-weather-info-container">
                                        <span><p>Feels Like</p> <p className="feels-like">{city.feelsLike} <sup>o</sup>C</p></span>
                                        <span><p>Humidity</p> <p className="humidity">{city.humidity}</p></span>
                                        <span><p>Pressure</p> <p className="pressure">{city.pressure}</p></span>
                                    </div>
                                </div>)
                        })
                    }
                </div>
        </>
    )
}
export default AllCities