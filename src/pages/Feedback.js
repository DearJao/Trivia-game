import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const minimumScore = 3;
    const { score } = this.props;

    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { score < minimumScore ? 'Could be better...' : 'Well Done!' }
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (store) => ({
  score: store.player.score,
});

export default connect(mapStateToProps)(Feedback);
