import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    const URL = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header>
        <img src={ URL } alt="Avatar" />
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
