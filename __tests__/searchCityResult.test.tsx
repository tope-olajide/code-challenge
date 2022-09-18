import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SearchCityResult from "../components/SearchCityResult";
import { IWeatherInfo } from "../types";
import { fakeCityData } from "../__mocks__/fakeCityData";
let container: HTMLDivElement;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
});


it("renders SearchCityResult Component",  () => {
    act(() => {
        render(
        <SearchCityResult 
        foundCity={fakeCityData}
        closeCity = {jest.fn}
        displayFiveDaysForecast= {jest.fn}
        />, container);
      });
      expect((container.querySelector(".card-title") as HTMLElement).textContent)
      .toBe(`${fakeCityData[0].name}, ${fakeCityData[0].country}`);
       expect((container.querySelector(".temperature") as HTMLElement).textContent)
      .toBe(`${fakeCityData[0].temperature}oC`);
      expect((container.querySelector(".weather-description") as HTMLElement).textContent)
      .toBe(`${fakeCityData[0].description}`);
      expect((container.querySelector(".feels-like") as HTMLElement).textContent)
      .toBe(`${fakeCityData[0].feelsLike} oC`);

});

