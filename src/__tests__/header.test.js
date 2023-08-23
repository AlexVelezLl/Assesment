import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../components/Header';

describe("Header component", () => {
  test("renders without crashing", () => {
    render(<Header />);
    expect(true).toBe(true); // If app crash wont reach this line
  });

  test("renders BP Logo", () => {
    render(<Header />);
    expect(screen.getByAltText("BP Logo")).toBeInTheDocument();
  });
});
