import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Library Explorer title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Library Explorer/i);
  expect(titleElement).toBeInTheDocument();
}); 

test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search title or author/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders tag filter', () => {
  render(<App />);
  const tagFilter = screen.getByText(/All tags/i);
  expect(tagFilter).toBeInTheDocument();
});

test('renders min rating filter', () => {
  render(<App />);
  const minRatingFilter = screen.getByText(/Min rating:/i);
  expect(minRatingFilter).toBeInTheDocument();
});

test('renders sort selector', () => {
  render(<App />);
  const sortSelector = screen.getByText(/Sort by:/i);
  expect(sortSelector).toBeInTheDocument();
});

test('renders reset button', () => {
  render(<App />);
  const resetButton = screen.getByText(/Reset/i);
  expect(resetButton).toBeInTheDocument();
});

test('renders show favorites only checkbox', () => {
  render(<App />);
  const showFavoritesOnlyCheckbox = screen.getByText(/Show favorites only/i);
  expect(showFavoritesOnlyCheckbox).toBeInTheDocument();
});
