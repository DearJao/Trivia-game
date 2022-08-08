import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { executeLogin } from '../redux/actions';

const URL = 'https://opentdb.com/api_token.php?command=request';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userName: '',
      isNameValid: false,
      isEmailValid: false,
    };
  }

  setDisableSaveButton() {
    const { userEmail, userName } = this.state;
    const minLength = 1;
    const isNameValid = userName.length >= minLength;
    const isEmailValid = this.checkEmailIsValid(userEmail);
    this.setState({
      isEmailValid,
      isNameValid,
    });
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.setDisableSaveButton());
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.handleFetchToken();
  }

  handleFetchToken = () => {
    const { history, login } = this.props;
    fetch(URL)
      .then((response) => response.json())
      .then(({ token }) => localStorage.setItem('token', token))
      .then(() => {
        this.handleLogin(login, history);
      });
  }

  handleLogin = (login, history) => {
    const { userEmail, userName } = this.state;
    login(userEmail, userName);
    history.push('/game');
  }

  checkEmailIsValid(email) {
    const MAIL_FORMAT = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return email.match(MAIL_FORMAT);
  }

  render() {
    const {
      userEmail,
      userName,
      isEmailValid,
      isNameValid,
    } = this.state;

    const { history } = this.props;

    return (
      <form onSubmit={ this.handleSubmit }>
        <h2>Login</h2>
        <p>
          <label htmlFor="user-password">
            Name:
            {' '}
            <input
              type="text"
              name="userName"
              id="user-name"
              data-testid="input-player-name"
              value={ userName }
              onChange={ this.handleInputChange }
              placeholder="Enter a name"
            />
          </label>
        </p>
        <p>
          <label htmlFor="user-email">
            Email:
            {' '}
            <input
              type="email"
              id="user-email"
              data-testid="input-gravatar-email"
              name="userEmail"
              value={ userEmail }
              onChange={ this.handleInputChange }
              placeholder="user@mail.com"
            />
          </label>
        </p>
        <p>
          <button
            type="submit"
            disabled={ !(isEmailValid && isNameValid) }
            data-testid="btn-play"
          >
            Play
          </button>
        </p>
        <p>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Settings
          </button>
        </p>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (name, email) => dispatch(executeLogin(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
