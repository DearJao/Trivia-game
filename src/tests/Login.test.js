import React from 'react';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
  test('se existe um h2 com login', () => {
    renderWithRouterAndRedux(<App />)
    const title = screen.getByRole('heading',
      {name: /login/i, level: 2});
    expect(title).toBeInTheDocument();
  });
  test('se existe o input de name', () => {
    renderWithRouterAndRedux(<App />)
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
  });
  test('se existe o input de email', () => {
    renderWithRouterAndRedux(<App />)
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();
  });
  test('se existe o botão Play está desativado', () => {
    renderWithRouterAndRedux(<App />)
    const btnPlay = screen.getByRole('button',
      {name: /play/i});
    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay).toBeDisabled();
  });
  test('o funcionamento do botão Play', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        "response_code":0,
        "response_message":"Token Generated Successfully!",
        "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
      })
    });
    const { history } = renderWithRouterAndRedux(<App />)
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, "Jonas");
    userEvent.type(inputEmail, "meuemail@gmail.com");

    const btnPlay = screen.getByRole('button',
      {name: /play/i});
    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay).not.toBeDisabled();

    userEvent.click(btnPlay)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/game')
  });
  test('o funcionamento do botão Settings', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    const btnSettings = screen.getByRole('button',
      {name: /settings/i});
    expect(btnSettings).toBeInTheDocument();
    userEvent.click(btnSettings)
    expect(history.location.pathname).toBe('/settings')
  });
})