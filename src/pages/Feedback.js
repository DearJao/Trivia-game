import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    const { score, name, email } = this.props;
    const scoreToRanking = {
      name,
      score,
      email,
    };

    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const arrOfObj = [
      ...ranking,
      scoreToRanking,
    ];
    console.log(arrOfObj);
    localStorage.setItem('ranking', JSON.stringify(arrOfObj));
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
          { score < minimumScore ? 'Could be better...' : 'Well Done!' }
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (store) => ({
  score: store.player.score,
  assertions: store.player.assertions,
  name: store.player.name,
  email: store.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
