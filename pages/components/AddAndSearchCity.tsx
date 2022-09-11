import { FormEvent } from "react";

interface IAddAndSearchCityProps {
    addCity(event: FormEvent): Promise<void>;
    searchCity(event: FormEvent): void;
    enteredCity: string;
    setEnteredCity(city:string):void;
}

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
            <div className="button-container">
              <button className="add-city-button" onClick={(event) => props.addCity(event)}>Add City</button>
              <button className="add-city-button" onClick={(event) => props.searchCity(event)}>Search City</button>
            </div>
            
          </form>
        </div>
      </>
    )
  }
  export default AddAndSearchCity