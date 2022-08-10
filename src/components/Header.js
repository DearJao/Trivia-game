import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      gravatar: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const URL = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      gravatar: URL,
    });
  }

  render() {
    const { name, score } = this.props;
    const { gravatar } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatar }
          alt="Avatar"
        />
        <p
          data-testid="header-player-name"
        >
          { name }
        </p>
        <p
          data-testid="header-score"
        >
          Score:
          { score }
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (store) => ({
  name: store.player.name,
  score: store.player.score,
});

export default connect(mapStateToProps)(Header);
