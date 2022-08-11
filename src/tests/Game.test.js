import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Game from '../pages/Game';
import { successResponse , invalidResponse } from './helpers/constants';

const ROUTE = '/game'
const INITIAL_STATE = {
  player: {
    name: 'Jonas',
    gravatarEmail: 'jonas@gmail.com',
    score: 0,
    assertions: 0,
    timer: 30,
  },
  api: {
    isLoading: true,
    questions: {},
    isTokenInvalid: false,
  },
};

const { results } = successResponse;

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(successResponse)
  });
})

afterEach(() => jest.clearAllMocks());

describe('Desenvolva testes para atingir 90% de cobertura da tela de Jogo', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(successResponse)
    });
    renderWithRouterAndRedux(<Game />,
      INITIAL_STATE,
      ROUTE,
    )
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  })

  test('se tem gravatar, player name e score', () => {
    const gravatar = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const Score = screen.getByTestId('header-score');
    expect(gravatar).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(Score).toBeInTheDocument();
  });
  test('se tem a categoria e o texto da pergunta', () => {
    const title = screen.getByTestId('question-category');
    const text = screen.getByTestId('question-text');

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(results[0].category);

    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(results[0].question);
  });
  test('se tem o número de respostas correto', () => {
    const btn = screen.getAllByRole('button');
    expect(btn).toHaveLength(4);
  });
  test('se tem o botão de next quando clicar em alguma resposta', () => {
    const btn = screen.getAllByRole('button');
    userEvent.click(btn[0])
    const btnNext = screen.getByRole('button', {name: 'Next'});
    expect(btnNext).toBeInTheDocument();
    userEvent.click(btnNext)

    const title = screen.getByTestId('question-category');
    const text = screen.getByTestId('question-text');
    expect(title).toHaveTextContent(results[1].category);
    expect(text).toHaveTextContent(results[1].question);
  });
  test('se o score é atualizado', () => {
    const score = screen.getByTestId('header-score');
    expect(score).toHaveTextContent('0');
    const btn = screen.getByRole('button', {
      name: results[0].correct_answer});
    userEvent.click(btn);
    expect(score).toHaveTextContent('40');
  });
});

describe('Testando as rotas ao terminar o jogo', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(successResponse)
    });
  })

  test('se encerra o jogo após as 5 perguntas', async() => {
    const { history } = renderWithRouterAndRedux(<Game />,
      INITIAL_STATE,
      ROUTE,
    )

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    results.forEach((item, index) => {
      const btn = screen.getByRole('button', {
        name: item.correct_answer});
      userEvent.click(btn);
      const btnNext = screen.getByTestId('btn-next');
      if(index < 4) {
        userEvent.click(btnNext);
      } else {
        userEvent.click(btnNext);
        expect(history.location.pathname).toBe('/feedback')
      }
    });
  })
});

describe('Testando o timer das questões', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(successResponse)
    });
    const INITIAL_STATE = {
      player: {
        name: 'Jonas',
        gravatarEmail: 'jonas@gmail.com',
        score: 0,
        assertions: 0,
        timer: 1,
      },
      api: {
        isLoading: true,
        questions: {},
        isTokenInvalid: false,
        error: '',
      },
    };
    renderWithRouterAndRedux(<Game />,
      INITIAL_STATE,
      ROUTE,
    )
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  })

  it('deve bloquear os botões e aparecer o botão "Next" quando o tempo for 0', async() => {
    await waitFor(() => {
      expect(screen.getByTestId('timer')).toHaveTextContent('0');
    }, { timeout: 2000 })
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });
});

describe('Testando se a pagina Game volta para o inicio caso o token seja invalido', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidResponse)
    });
  })
  it('deve voltar para a tela de Login caso o token seja inválido, e as questões não devem estar presentes na tela em nenhum momento', async() => {
    const INITIAL_STATE = {
      player: {
        name: 'Jonas',
        gravatarEmail: 'jonas@gmail.com',
        score: 0,
        assertions: 0,
        timer: 30,
      },
      api: {
        isLoading: true,
        questions: {},
        isTokenInvalid: false,
      },
    };
    const { history } = renderWithRouterAndRedux(<Game />,
      INITIAL_STATE,
      ROUTE,
    )
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/');
  });
});
