import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const arrOfObj = [
  { name: "uma pessoa",
  gravatarEmail: "pessoa@email.com",
  score: 0,
  },
  { name: "outra pessoa",
  gravatarEmail: "outra@pessoa.com",
  score: 0,
  },
  { name: "qualquer pessoa",
  gravatarEmail: "qualquer@pessoa.com",
  score: 0,
  },
]

const arrOfObjStringified = JSON.stringify(arrOfObj);

const emptyArrStringified = JSON.stringify([]);

beforeEach(() => {
  jest.spyOn(Storage.prototype, 'setItem');
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn();
});

afterEach(() => {
  Storage.prototype.setItem.mockClear();
  Storage.prototype.getItem.mockClear();
})

describe('Desenvolva testes para atingir 90% de cobertura da tela de Ranking', () => {
  test('se existe o texto "nenhum raking encontrado" se haver nenhum historico de jogo', () => {
    // localStorage.setItem('ranking', JSON.stringify(emptyArr));
    localStorage.getItem.mockReturnValue(emptyArrStringified);
    renderWithRouterAndRedux(<Ranking />);

    const emptyRanking = screen.getByText(/nenhum raking encontrado/i);

    expect(emptyRanking).toBeInTheDocument();
  });
  test('se existe um h2 com "Ranking Geral"', () => {
    // localStorage.setItem('ranking', JSON.stringify(arrOfObj));
    localStorage.getItem.mockReturnValue(arrOfObjStringified);
    renderWithRouterAndRedux(<Ranking />);
    const title = screen.getByTestId('ranking-title');

    expect(title).toBeInTheDocument();
  });
  test('se existem 3 imagens', () => {
    localStorage.getItem.mockReturnValue(arrOfObjStringified);
    renderWithRouterAndRedux(<Ranking />);

    const getImg = screen.getAllByRole('img')
    getImg.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });
  test('se ao apertar o botão de login você é redirecionado para a tela de inicio', () => {
    localStorage.getItem.mockReturnValue(arrOfObjStringified);
    const { history } = renderWithRouterAndRedux(<Ranking />);

    const btnLogin = screen.getByRole('button', {name: /login/i});
    expect(btnLogin).toBeInTheDocument();

    userEvent.click(btnLogin);

    expect(history.location.pathname).toBe('/');
  });

  test('Deve mostrar a mensagem "nenhum raking encontrado" se não houver uma chave "ranking" no localStorage', () => {
    // localStorage.removeItem('ranking');
    localStorage.getItem.mockReturnValue(null);
    renderWithRouterAndRedux(<Ranking />);
    const emptyRanking = screen.getByText(/nenhum raking encontrado/i);
    expect(emptyRanking).toBeInTheDocument();
  });
});

// src/pages/Ranking.js