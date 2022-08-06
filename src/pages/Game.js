import React, { Component } from 'react';
import questionsResponse from '../utils/constants';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  getSortedAnswers(item) {
    const sortFactor = 0.5;
    const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = item;
    const answersList = [correctAnswer, ...incorrectAnswers];
    const sortedAnswersList = answersList.sort(() => Math.random() - sortFactor);
    return sortedAnswersList;
  }

  showNextQuestion = () => {
    this.setState((PrevState) => ({
      activeIndex: PrevState.activeIndex + 1,
    }));
  }

  renderBtn(bool, str, number) {
    if (bool) {
      return (
        <button key={ number } type="button" data-testid="correct-answer">{ str }</button>
      );
    }
    return (
      <button
        key={ number }
        type="button"
        data-testid={ `wrong-answer-${number}` }
      >
        { str }
      </button>
    );
  }

  renderQuestion = () => {
    const { activeIndex } = this.state;
    const { results } = questionsResponse;
    return (
      <section>
        <h2>{ results[activeIndex].category }</h2>
        <h3>{ results[activeIndex].question }</h3>
        <div data-testid="answer-options">
          {
            this.getSortedAnswers(results[activeIndex]).map((answer, indexAnswer) => {
              if (answer === results[activeIndex].correct_answer) {
                return this.renderBtn(true, answer, indexAnswer);
              }
              return this.renderBtn(false, answer, indexAnswer);
            })
          }
        </div>
      </section>
    );
  }

  render() {
    return (
      <div>
        {
          this.renderQuestion()
        }
      </div>
    );
  }
}

export default Game;
