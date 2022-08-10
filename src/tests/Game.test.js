import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Game from '../pages/Game';

const INITIAL_STATE = {
  player: {
    name: 'Jonas',
    gravatarEmail: 'jonas@gmail.com',
    score: 0,
    assertions: 0,
    timer: 30
  },
  api: {
    isLoading: true,
    questions: {},
    isInvalid: false
  }
};

const questions = {
  response_code: 0,
  results: [
    {
      category: 'History',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Which one of these tanks was designed and operated by the United Kingdom?',
      correct_answer: 'Tog II',
      incorrect_answers: [
        'M4 Sherman',
        'Tiger H1',
        'T-34'
      ],
      sortedAnswersList: [
        'Tog II',
        'M4 Sherman',
        'T-34',
        'Tiger H1'
      ]
    },
    {
      category: 'Entertainment: Film',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the name of the first &quot;Star Wars&quot; film by release order?',
      correct_answer: 'A New Hope',
      incorrect_answers: [
        'The Phantom Menace',
        'The Force Awakens',
        'Revenge of the Sith'
      ],
      sortedAnswersList: [
        'The Phantom Menace',
        'A New Hope',
        'Revenge of the Sith',
        'The Force Awakens'
      ]
    },
    {
      category: 'Entertainment: Board Games',
      type: 'multiple',
      difficulty: 'medium',
      question: 'In Yu-Gi-Oh, how does a player perform an Xyz Summon?',
      correct_answer: 'Overlay at least 2 Monsters of the Same Level',
      incorrect_answers: [
        'Activate a Spell and Send Monsters to the Graveyard',
        'Add the Monsters&#039; Levels Together to Match the Xyz Monster',
        'Banish A Number of Monsters From Your Hand And Deck'
      ],
      sortedAnswersList: [
        'Banish A Number of Monsters From Your Hand And Deck',
        'Overlay at least 2 Monsters of the Same Level',
        'Add the Monsters&#039; Levels Together to Match the Xyz Monster',
        'Activate a Spell and Send Monsters to the Graveyard'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Who invented the &quot;Spanning Tree Protocol&quot;?',
      correct_answer: 'Radia Perlman',
      incorrect_answers: [
        'Paul Vixie',
        'Vint Cerf',
        'Michael Roberts'
      ],
      sortedAnswersList: [
        'Michael Roberts',
        'Vint Cerf',
        'Paul Vixie',
        'Radia Perlman'
      ]
    },
    {
      category: 'General Knowledge',
      type: 'multiple',
      difficulty: 'easy',
      question: 'The likeness of which president is featured on the rare $2 bill of USA currency?',
      correct_answer: 'Thomas Jefferson',
      incorrect_answers: [
        'Martin Van Buren',
        'Ulysses Grant',
        'John Quincy Adams'
      ],
      sortedAnswersList: [
        'John Quincy Adams',
        'Ulysses Grant',
        'Martin Van Buren',
        'Thomas Jefferson'
      ]
    }
  ]
};

beforeEach(async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(questions)
  });
  renderWithRouterAndRedux(<Game />,
    INITIAL_STATE,
    "/game"
  )
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
})

const { results } = questions;

describe('Desenvolva testes para atingir 90% de cobertura da tela de Jogo', () => {
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
  test('se encerra o jogo após as 5 perguntas', () => {
    const { history } = renderWithRouterAndRedux(<Game />,
      INITIAL_STATE,
      "/game",
    )
    results.forEach((item, index) => {
      const btn = screen.getByRole('button', {
        name: item.correct_answer});
      userEvent.click(btn);
      const btnNext = screen.getByTestId('btn-next');
      if(index < 4) {
        userEvent.click(btnNext);
      } else {
        // Esse botão aqui tá dando erro. Ele só diz que não pode ler a propriedade push
        userEvent.click(btnNext);
        expect(history.location.pathname).toBe('/feedback')
      }
    });
  })
});