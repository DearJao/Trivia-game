import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const { score, name, email } = this.props;
    if (name && email) {
      const scoreToRanking = {
        name,
        score,
        email,
      };
      const arrOfObj = [
        ...ranking,
        scoreToRanking,
      ];
      localStorage.setItem('ranking', JSON.stringify(arrOfObj));
    }
  }

  render() {
    const minimumScore = 3;
    const { score, assertions, history } = this.props;

    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-text">
          { assertions <= minimumScore ? 'Could be better...' : 'Well Done!' }
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (store) => ({
  score: store.player.score,
  assertions: store.player.assertions,
  name: store.player.name,
  email: store.player.gravatarEmail,
});

export default connect(mapStateToProps)(withRouter(Feedback));
