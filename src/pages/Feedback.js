import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  handleButton = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const minimumScore = 3;
    const { score, assertions } = this.props;

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
          onClick={ this.handleButton }
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
});

export default connect(mapStateToProps)(Feedback);
