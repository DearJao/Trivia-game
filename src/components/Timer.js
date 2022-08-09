import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timerDecreasing } from '../redux/actions';

class Timer extends React.Component {
  componentDidMount() {
    const { counter } = this.props;
    this.count();
    counter();
  }

  componentWillUnmount() {
    this.resetTimer();
  }

  resetTimer = () => {
    clearInterval(this.timer);
    return 0;
  }

  count = () => {
    const { timerDecreasingDispatch } = this.props;
    const oneSecond = 1000;
    this.timer = setInterval(() => {
      timerDecreasingDispatch()
    }, oneSecond);
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
        { timer === 0 ? this.resetTimer() : timer }
      </div>
    );
  }
}

Timer.propTypes = {
  counter: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  timer: store.player.timer,
});

const mapDispatchToProps = (dispatch) => ({
  timerDecreasingDispatch: () => dispatch(timerDecreasing()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Timer);
