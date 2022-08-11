import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';

const FEEDBACK_TEXT_SELECTOR = 'feedback-text';
const FEEDBACK_TOTAL_QUESTION_SELECTOR = 'feedback-total-question';
const FEEDBACK_TOTAL_SCORE_SELECTOR = 'feedback-total-score';

const PLAYER_NAME = 'Nome da pessoa';
const PLAYER_EMAIL = 'email@pessoa.com';
const SCORE = 50;
const ASSERTIONS = 3;
const ROUTE = '/feedback';

const getElemByTestId = (testId) => screen.getByTestId(testId);
const getBtn = (text) => screen.getByRole('button', { name: text });

describe('Testando a página de Feedback', () => {
  describe('Testando a presença de elementos na página', () => {
    // beforeEach(() => renderWithRouterAndRedux(<Feedback />, initialState, ROUTE));
    it('deve aparecer na tela os elementos contendo os pontos e a quantidade de respostas corretas', () => {
      const initialState = {
        player: {
          name: PLAYER_NAME,
          gravatarEmail: PLAYER_EMAIL,
          score: SCORE,
          assertions: ASSERTIONS,
        },
      }
      renderWithRouterAndRedux(<Feedback />, initialState, ROUTE);
      expect(getElemByTestId(FEEDBACK_TOTAL_SCORE_SELECTOR)).toHaveTextContent('50');
      expect(getElemByTestId(FEEDBACK_TOTAL_QUESTION_SELECTOR)).toHaveTextContent('3');
    });
  });

  describe('Testando a mensagem de feedback', () => {
    it('deve mostrar na tela a mensagem "Could be better..." caso o número de acertos seja menor ou igual a 3', () => {
      const ASSERTIONS = 2;
      const initialState = {
        player: {
          name: PLAYER_NAME,
          gravatarEmail: PLAYER_EMAIL,
          score: SCORE,
          assertions: ASSERTIONS,
        },
      }
      renderWithRouterAndRedux(<Feedback />, initialState, ROUTE);
      expect(getElemByTestId(FEEDBACK_TEXT_SELECTOR)).toHaveTextContent("Could be better...");
    });
  
    it('deve mostrar na tela a mensagem "Well Done" caso o número de acertos seja maior do que 3', () => {
      const ASSERTIONS = 4;
      const initialState = {
        player: {
          name: PLAYER_NAME,
          gravatarEmail: PLAYER_EMAIL,
          score: SCORE,
          assertions: ASSERTIONS,
        },
      }
      renderWithRouterAndRedux(<Feedback />, initialState, ROUTE);
      expect(getElemByTestId(FEEDBACK_TEXT_SELECTOR)).toHaveTextContent("Well Done");
    });
  });
  
  describe('Testando os botões da página', () => {
    it('deve ir para a página inicial de Login ao clicar no botão "Play Again"', () => {
      const initialState = {
        player: {
          name: PLAYER_NAME,
          gravatarEmail: PLAYER_EMAIL,
          score: SCORE,
          assertions: ASSERTIONS,
        },
      }
      const { history } = renderWithRouterAndRedux(<Feedback />, initialState, ROUTE);
      userEvent.click(screen.getByRole('button', { name: "Play Again" }));
      expect(history.location.pathname).toEqual('/');
    });

    it('deve ir para a página de Ranking ao clicar no botão "Ranking"', () => {
      const initialState = {
        player: {
          name: PLAYER_NAME,
          gravatarEmail: PLAYER_EMAIL,
          score: SCORE,
          assertions: ASSERTIONS,
        },
      }
      const { history } = renderWithRouterAndRedux(<Feedback />, initialState, ROUTE);
      userEvent.click(screen.getByRole('button', { name: "Ranking" }));
      expect(history.location.pathname).toEqual('/ranking');
    });
  });
});