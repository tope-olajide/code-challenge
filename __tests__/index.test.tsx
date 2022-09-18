import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MainPage from '../components/MainPage'


describe("Weather App", () => {
    it("renders MainPage Component", () => {
      render(<MainPage />);
      expect(screen.getByTestId("navigation-bar")).toBeInTheDocument();
      expect(screen.getByTestId("add-and-search-city-form")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
  });
