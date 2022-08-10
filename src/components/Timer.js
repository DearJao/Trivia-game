import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timerDecreasing } from '../redux/actions';
import { MAX_INDEX } from '../utils/constants';

class Timer extends React.Component {
  componentDidMount() {
    this.count();
  }

  componentDidUpdate(prevProps) {
    const { activeIndex, hasToStop } = this.props;
    if (activeIndex <= MAX_INDEX && activeIndex !== prevProps.activeIndex) {
      this.count();
    }
    if (hasToStop && hasToStop !== prevProps.hasToStop) {
      this.resetTimer();
    }
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
      timerDecreasingDispatch();
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
  timerDecreasingDispatch: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  hasToStop: PropTypes.bool.isRequired,
};

const mapStateToProps = (store) => ({
  timer: store.player.timer,
});

const mapDispatchToProps = (dispatch) => ({
  timerDecreasingDispatch: () => dispatch(timerDecreasing()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
