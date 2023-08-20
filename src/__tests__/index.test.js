import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../components/index';

describe("BP Products App", () => {
  test("renders without crashing", () => {
    render(<App />);
    expect(true).toBe(true); // If app crash wont reach this line
  });

  test("renders banner element", () => {
    render(<App />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });
});

