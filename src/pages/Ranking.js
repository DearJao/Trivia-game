import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      rankingLocalStorage:
      JSON.parse(localStorage.getItem('ranking')) || [],
    };
  }

  getURL = (email) => {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  render() {
    const { history } = this.props;
    const { rankingLocalStorage } = this.state;

    rankingLocalStorage.sort((a, b) => a.score - b.score);

    console.log(rankingLocalStorage);

    return (
      <div>
        { rankingLocalStorage.length > 0 ? (
          <div>
            <h2 data-testid="ranking-title">Ranking Geral</h2>
            { rankingLocalStorage.map((item) => (
              <div key={ item.email }>
                <img
                  data-testid="header-profile-picture"
                  src={ this.getURL(item.email) }
                  alt="Avatar"
                />
                <p data-testid={ `player-name-${item.name}` }>
                  { item.name }
                </p>
                <p data-testid={ `player-score-${item.score}` }>
                  Score:
                  { item.score }
                </p>
              </div>
            ))}
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={ () => history.push('/') }
            >
              Login
            </button>
          </div>
        ) : <p>nenhum raking encontrado</p> }
      </div>
    );
  }
}

// data-testid={ `player-name-${aaaa}` }
// data-testid={ `player-score-${aaaa}` }

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (store) => ({
  name: store.player.name,
  score: store.player.score,
});

export default connect(mapStateToProps)(Ranking);
