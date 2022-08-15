import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    // console.log(rankingLocalStorage);
    rankingLocalStorage.sort((a, b) => b.score - a.score);
    // console.log(rankingLocalStorage);

    return (
      <div>
        { rankingLocalStorage.length > 0 ? (
          <div>
            <h2 data-testid="ranking-title">Ranking Geral</h2>
            { rankingLocalStorage.map((item, index) => (
              <div key={ index } className="ranking-card">
                <img
                  data-testid="header-profile-picture"
                  src={ this.getURL(item.email) }
                  alt="Avatar"
                />
                <p data-testid={ `player-name-${index}` }>
                  { item.name }
                </p>
                <p data-testid={ `player-score-${index}` }>
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

export default connect(mapStateToProps)(withRouter(Ranking));
