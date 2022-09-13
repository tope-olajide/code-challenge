
import { IAddAndSearchCityProps } from "../../types";


const AddAndSearchCity: React.FC<IAddAndSearchCityProps> = (props) => {
    return (
        <>
            <div>
                <form className="add-and-search-city-form">
                    <input
                        type="text"
                        value={props.enteredCity}
                        onChange={(e) => props.setEnteredCity(e.target.value)}
                        className="add-city-input-field"
                    />
                    <span className="add-city-error" style={props.addCityError ? { display: "block" } : { display: "none" }}><p>{props.addCityError} </p></span>
                    <div className="button-container">
                        <button className="add-city-button" onClick={(event) => props.addCity(event)}>{props.isAddingCity ? "Fetching City..." : "Add City"}</button>
                        <button className="add-city-button" onClick={(event) => props.searchCity(event)}>Search City</button>
                    </div>

                </form>
            </div>
        </>
    )
}
export default AddAndSearchCity