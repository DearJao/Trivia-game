import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import { doFetchQuestions, timerReset, updateScore } from '../redux/actions';
import { URL_GET_QUESTIONS, difficultyScale, MAX_INDEX } from '../utils/constants';
import Timer from '../components/Timer';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0,
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
    const { isInvalid, error } = nextProps;
    const { activeIndex } = nextState;
    if (isInvalid) {
      this.handleLogout();
      return false;
    }
    if (activeIndex > MAX_INDEX) {
      return false;
    }
    if (error) return false;
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { timer, timerResetDispatch } = this.props;
    const { activeIndex } = this.state;
    if (timer === 0 && timer !== prevProps.timer) {
      this.timeOut();
    }
    if (activeIndex <= MAX_INDEX && activeIndex !== prevState.activeIndex) {
      timerResetDispatch();
    }
  }

  componentWillUnmount() {
    const { timerResetDispatch } = this.props;
    timerResetDispatch();
  }

  showNextQuestion = () => {
    this.setState((PrevState) => ({ borderColor: {
      correctAnswer: '',
      wrongAnswer: '',
    },
    hasNextBtn: false,
    disableButton: false,
    activeIndex: PrevState.activeIndex + 1 }), () => {
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
    const { activeIndex, hasNextBtn } = this.state;
    const { questions } = this.props;
    const { results } = questions;
    if (!results.length) {
      return null;
    }
    const {
      correct_answer: correctAnswer,
      difficulty,
    } = results[activeIndex];
    const validAnswerObj = { correctAnswer, difficulty };
    return (
      <section>
        <h2 data-testid="question-category">{ results[activeIndex].category }</h2>
        <h3 data-testid="question-text">{ results[activeIndex].question }</h3>
        <Timer activeIndex={ activeIndex } hasToStop={ hasNextBtn } />
        <div data-testid="answer-options">
          {
            results[activeIndex].sortedAnswersList.map((answer, indexAnswer) => {
              if (answer === correctAnswer) {
                return this.renderBtn(true, answer, indexAnswer, validAnswerObj);
              }
              return this.renderBtn(false, answer, indexAnswer, validAnswerObj);
            })
          }
        </div>
      </section>
    );
  }

  handleAnswer = (answer, validAnswerObj) => {
    const { correctAnswer, difficulty } = validAnswerObj;
    const { timer, score, updateScoreDispatch, timerResetDispatch } = this.props;
    const SCORE_COEFFICIENT = 10;
    if (correctAnswer === answer) {
      const newScore = score + SCORE_COEFFICIENT
        + (difficultyScale[difficulty] * timer);
      updateScoreDispatch(newScore);
    }
    this.setState({ borderColor: {
      correctAnswer: '3px solid rgb(6, 240, 15)',
      wrongAnswer: '3px solid red',
    },
    hasNextBtn: true,
    }, () => timerResetDispatch(timer));
  }

  timeOut = () => {
    this.setState({ disableButton: true,
      borderColor: {
        correctAnswer: '3px solid rgb(6, 240, 15)',
        wrongAnswer: '3px solid red',
      },
      hasNextBtn: true,
    });
  }

  handleLogout() {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  }

  handleFetchQuestions() {
    const { onFecthQuestions } = this.props;
    const TOKEN = localStorage.getItem('token');
    const URL_QUESTIONS = URL_GET_QUESTIONS + TOKEN;
    onFecthQuestions(URL_QUESTIONS);
  }

  renderBtn(bool, str, number, validAnswerObj) {
    const { borderColor: { correctAnswer, wrongAnswer }, disableButton } = this.state;
    return (
      <button
        disabled={ disableButton }
        onClick={ () => this.handleAnswer(str, validAnswerObj) }
        style={ bool ? { border: correctAnswer } : { border: wrongAnswer } }
        key={ number }
        type="button"
        data-testid={ bool ? 'correct-answer' : `wrong-answer-${number}` }
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
        { !isLoading && this.renderQuestion() }
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
  timerResetDispatch: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  updateScoreDispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
};

Game.defaultProps = {
  results: [],
  error: '',
};

const mapDispatchToProps = (dispatch) => ({
  onFecthQuestions: (url) => dispatch(doFetchQuestions(url)),
  updateScoreDispatch: (newScore) => dispatch(updateScore(newScore)),
  timerResetDispatch: (time) => dispatch(timerReset(time)),
});

const mapStateToProps = (state) => ({
  questions: state.api.questions,
  isLoading: state.api.isLoading,
  isInvalid: state.api.isTokenInvalid,
  error: state.api.error,
  timer: state.player.timer,
  score: state.player.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));
