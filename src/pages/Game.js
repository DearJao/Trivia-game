import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { doFetchQuestions } from '../redux/actions';
import { URL_GET_QUESTIONS, questionsResponse } from '../utils/constants';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 2,
    };
  }

  componentDidMount() {
    this.handleFetchQuestions();
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

  renderQuestion = () => {
    const { activeIndex } = this.state;
    const { questions } = this.props;
    console.log(questions);
    // this.handleCodeResponse(questions);
    const { results } = questions;
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

  handleCodeResponse = ({ response_code: responseCode }) => {
    if (responseCode === 0) return;
    // localStorage.removeItem('token');
    const { history } = this.props;
    history.push('/');
  }

  async handleFetchQuestions() {
    const { onFecthQuestions } = this.props;
    const TOKEN = localStorage.getItem('token');
    // const TOKEN_INVALID = 'INVALID_TOKEN';
    const URL_QUESTIONS = URL_GET_QUESTIONS + TOKEN;
    onFecthQuestions(URL_QUESTIONS);
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

  render() {
    const { isLoading } = this.props;
    return (
      <div>
        {
          !isLoading && this.renderQuestion()
        }
      </div>
    );
  }
}

Game.propTypes = {
  onFecthQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onFecthQuestions: (url) => dispatch(doFetchQuestions(url)),
});

const mapStateToProps = (state) => ({
  questions: state.api.questions,
  isLoading: state.api.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
