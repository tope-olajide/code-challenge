import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import TwelveHoursForecast from "../components/TwelveHoursForecast";
import { fakeTwelveHoursData } from "../__mocks__/fakeTwelveHoursWeatherData";
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


it("renders TwelveHoursForecast Component", async () => {
    let globalRef: any = global;
    globalRef.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(fakeTwelveHoursData)
    }))
    await act(async () => {
        render(<TwelveHoursForecast
            twelveHoursForecastURL={'https://api.openweathermap.org/data/2.5/forecast?lat=6.5833&lon=3.75&appid&units=metric'}
            day={1663585200}
            cityName={'Lagos'}
            closeTwelveHoursForecasts={jest.fn}
        />,
            container);
    });
    const firstCardElement = (screen.getAllByTestId('card')[0] as HTMLElement);
    expect(firstCardElement.querySelector('.card-title')!.textContent).toBe('1:00:00 AM');
    expect(firstCardElement.querySelector('.temperature')!.textContent).toBe('24oC');
    expect(firstCardElement.querySelector('.weather-description')!.textContent).toBe(`light rain`);

});