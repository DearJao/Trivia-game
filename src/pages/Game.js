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

  renderQuestions = () => {
    const { activeIndex } = this.state;
    const { results } = questionsResponse;
    return results.map((item, index) => {
      const isActive = activeIndex === index;
      return (
        <section
          key={ index }
          style={ isActive ? null : { display: 'none' } }
        >
          <h2>{ item.category }</h2>
          <h3>{ item.question }</h3>
          <div data-testid="answer-options">
            {
              this.getSortedAnswers(item).map((answer, indexAnswer) => {
                if (answer === item.correct_answer) {
                  return this.renderBtn(true, answer, indexAnswer);
                }
                return this.renderBtn(false, answer, indexAnswer);
              })
            }
          </div>
        </section>
      );
    });
  }

  render() {
    return (
      <div>
        {
          this.renderQuestions()
        }
      </div>
    );
  }
}

export default Game;
