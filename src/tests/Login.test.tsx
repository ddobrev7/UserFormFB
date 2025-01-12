import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

test('renders the login form with username and password', () => {
  render(<Login />);

  expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByText('Login Now')).toBeInTheDocument();
});

test('shows validation error when username and password are empty', () => {
  render(<Login />);

  fireEvent.click(screen.getByText('Login Now'));

  expect(screen.getByText('Please enter a valid username and password')).toBeInTheDocument();
});

test('shows a message with username after successful login', () => {
  render(<Login />);

  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'valid-user' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'valid-password' } });

  fireEvent.click(screen.getByText('Login Now'));

  expect(screen.getByText('Hi, valid-user')).toBeInTheDocument();
});
