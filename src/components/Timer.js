import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

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
      const oneSecond = 1000;
      this.timer = setInterval(() => {
        this.setState((state) => ({ seconds: state.seconds - 1 }));
      }, oneSecond);
    }

    render() {
      const { seconds } = this.state;
      return (
        <div>
          { seconds === 0 ? this.resetTimer() : seconds }
        </div>
      );
    }
}

Timer.propTypes = {
  counter: PropTypes.func.isRequired,
};

export default Timer;
