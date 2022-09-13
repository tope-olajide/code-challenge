import { ISearchCityResultProps } from "../types"
import Footer from "./Footer"
import NavigationBar from "./NavigationBar"


const SearchCityResult = (props:ISearchCityResultProps) => {

    if (props.foundCity.length) {
        return (
            <>
                <section className="main-section">
                <NavigationBar />
                <section className="main-contents">
                <button className="back-button" onClick={props.closeCity}>Back</button>
                    <div className="card-container">
                        {
                            props.foundCity.map((city, index) => {
                                return (
                                    <div key={index} onClick={() => props.displayFiveDaysForecast(city)} className="card">
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
                    </div>
                </section>
                <Footer />
            </section>
            </>
        )
    }
    return (
        <>
                            <section className="main-section">
                    <NavigationBar />
                    <section className="main-contents">
                    <button className="back-button" onClick={props.closeCity}>Back</button>
                        <div className="card-container">
                            <div className="card no-city-card">
                                <h1>⚠️City Not Found!</h1>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </section>
        </>
    )
}

export default SearchCityResult