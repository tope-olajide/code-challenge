import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import FiveDaysForecast from "../components/FiveDaysForecast";
import { render, screen } from "@testing-library/react";
import { fakeCityData } from "../__mocks__/fakeCityData";
import { fakeFiveDaysWeatherForecast } from "../__mocks__/fakeFiveDaysWeatherForecastData";
let container: HTMLDivElement | any;
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



it("renders FiveDaysForecast Component", async () => {
    let globalRef: any = global;
    globalRef.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({ daily: fakeFiveDaysWeatherForecast })
    }))
    await act(async () => {
        render(<FiveDaysForecast
            city={fakeCityData[0]}
            closeFiveDaysForecasts={jest.fn} />,
            container);
    });
    const firstCardElement = (screen.getAllByTestId('card')[0] as HTMLElement);
    const weekDay = (screen.getAllByTestId('card')[0] as HTMLElement);
    const temperature = (screen.getAllByTestId('card')[0].childNodes[2] as HTMLElement);
    const weatherDescription = (screen.getAllByTestId('card')[0].childNodes[3] as HTMLElement);

    expect(weekDay.querySelector('.card-title')!.textContent).toBe(new Date(fakeFiveDaysWeatherForecast[0].dt * 1000).toLocaleDateString("en", { weekday: "long" }));
    expect(firstCardElement.querySelector('.temperature')!.textContent).toBe(`${fakeFiveDaysWeatherForecast[0].temp.day}oC`);
    expect(firstCardElement.querySelector('.weather-description')!.textContent).toBe(`${fakeFiveDaysWeatherForecast[0].weather[0].description}`);

});