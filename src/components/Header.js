import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
      <div>
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
        <p>Score:</p>
        <p
          data-testid="header-score"
        >
          { score }
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (store) => ({
  name: store.player.name,
  score: store.player.score,
  email: store.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
