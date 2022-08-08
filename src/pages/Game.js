import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { doFetchQuestions } from '../redux/actions';
import { URL_GET_QUESTIONS } from '../utils/constants';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  componentDidMount() {
    this.handleFetchQuestions();
  }

  shouldComponentUpdate(nextProps) {
    const { isInvalid } = nextProps;
    console.log(isInvalid);
    if (isInvalid) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
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
    }));
  }

  renderQuestion = () => {
    const { activeIndex } = this.state;
    const { questions } = this.props;
    console.log(questions);
    const { results } = questions;
    if (!results.length) {
      return (
        <div>vazio</div>
      );
    }
    return (
      <section>
        <h2 data-testid="question-category">{ results[activeIndex].category }</h2>
        <h3 data-testid="question-text">{ results[activeIndex].question }</h3>
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

  handleFetchQuestions() {
    const { onFecthQuestions } = this.props;
    const TOKEN = localStorage.getItem('token');
    console.log(TOKEN);
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
  results: PropTypes.arrayOf(PropTypes.object),
  isInvalid: PropTypes.bool.isRequired,
};

Game.defaultProps = {
  results: [],
};

const mapDispatchToProps = (dispatch) => ({
  onFecthQuestions: (url) => dispatch(doFetchQuestions(url)),
});

const mapStateToProps = (state) => ({
  questions: state.api.questions,
  isLoading: state.api.isLoading,
  isInvalid: state.api.isInvalid,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
