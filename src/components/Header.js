import React, { Component } from 'react'
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    return (
      <header>
        <p
          data-testid="header-player-name"
        >
          { name }
        </p>
        <p
          data-testid="header-score"
        >
          Score: { score }
        </p>
      </header>
    )
  }
}

const mapStateToProps = (store) => ({
  name: store.player.name,
  score: store.player.score,
});

export default connect(mapStateToProps)(Header);
