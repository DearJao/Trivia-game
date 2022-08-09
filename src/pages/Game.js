import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { doFetchQuestions, updateScore } from '../redux/actions';
import { URL_GET_QUESTIONS } from '../utils/constants';
import Timer from '../components/Timer';

const MAX_INDEX = 4;

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      borderColor: {
        correctAnswer: '',
        wrongAnswer: '',
      },
      disableButton: false,
      hasNextBtn: false,
    };
  }

  componentDidMount() {
    this.handleFetchQuestions();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isInvalid } = nextProps;
    const { activeIndex } = nextState;
    console.log(isInvalid);
    if (isInvalid) {
      this.handleLogout();
      return false;
    }
    if (activeIndex > MAX_INDEX) {
      return false;
    }
    return true;
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
      hasNextBtn: false,
    }), () => {
      this.redirectToFeedback();
    });
  }

  redirectToFeedback = () => {
    const { history } = this.props;
    const { activeIndex } = this.state;
    if (activeIndex > MAX_INDEX) {
      history.push('/feedback');
    }
  }

  renderQuestion = () => {
    const { activeIndex } = this.state;
    const { questions } = this.props;
    const { results } = questions;
    console.log(results[activeIndex]);

    if (!results.length) {
      return null;
    }
    return (
      <section>
        <h2 data-testid="question-category">{ results[activeIndex].category }</h2>
        <h3 data-testid="question-text">{ results[activeIndex].question }</h3>
        <Timer counter={ this.counter } />
        <div data-testid="answer-options">
          {
            results[activeIndex].sortedAnswersList.map((answer, indexAnswer) => {
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

  handleAnswer = (event) => {
    const userAnswer = event.target.innerHTML
    const { activeIndex } = this.state;
    const { questions } = this.props;
    const { results } = questions;
    const corretAnswer = results[activeIndex].correct_answer;
    const difficulty = {
      easy: 1,
      medium: 2,
      hard: 3
    };

  if (corretAnswer === userAnswer) {
    const { timer, score, updateScoreDispatch } = this.props;

    const newScore = score + 10 + (difficulty[results[activeIndex].difficulty] * timer );
    updateScoreDispatch(newScore);
  }

  this.setState({ borderColor: {
      correctAnswer: '3px solid rgb(6, 240, 15)',
      wrongAnswer: '3px solid red',
    },
    hasNextBtn: true,
    });
  }

  timeOut = () => {
    this.setState({ disableButton: true });
    this.handleAnswer();
  }

  counter = () => {
    const thirtySeconds = 30000;
    setTimeout(this.timeOut, thirtySeconds);
  }

  handleLogout() {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  }

  handleFetchQuestions() {
    const { onFecthQuestions } = this.props;
    const TOKEN = localStorage.getItem('token');
    // const TOKEN_INVALID = 'INVALID';
    console.log(TOKEN);
    const URL_QUESTIONS = URL_GET_QUESTIONS + TOKEN;
    onFecthQuestions(URL_QUESTIONS);
  }

  renderBtn(bool, str, number) {
    const { borderColor: { correctAnswer, wrongAnswer }, disableButton } = this.state;
    if (bool) {
      return (
        <button
          disabled={ disableButton }
          onClick={ this.handleAnswer }
          style={ { border: correctAnswer } }
          key={ number }
          type="button"
          data-testid="correct-answer"
        >
          { str }

        </button>
      );
    }
    return (
      <button
        disabled={ disableButton }
        onClick={ this.handleAnswer }
        style={ { border: wrongAnswer } }
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
  const { hasNextBtn } = this.state;
  return (
    <div>
      <Header />
      {
        !isLoading && this.renderQuestion()
      }
      {
        hasNextBtn && (
          <button
            data-testid="btn-next"
            onClick={ this.showNextQuestion }
            type="button"
          >
            Next
          </button>
        )
      }
    </div>
  );
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
  results: PropTypes.arrayOf(PropTypes.object),
  isInvalid: PropTypes.bool.isRequired,
};

Game.defaultProps = {
  results: [],
};

const mapDispatchToProps = (dispatch) => ({
  onFecthQuestions: (url) => dispatch(doFetchQuestions(url)),
  updateScoreDispatch: (newScore) => dispatch(updateScore(newScore)),
});

const mapStateToProps = (state) => ({
  questions: state.api.questions,
  isLoading: state.api.isLoading,
  isInvalid: state.api.isInvalid,
  timer: state.player.timer,
  score: state.player.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
