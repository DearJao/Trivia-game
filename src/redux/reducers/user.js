// Esse reducer será responsável por tratar as informações da pessoa usuária
import actionTypes from '../actionTypes';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
  timer: 30,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case actionTypes.TIMER_DECREASING:
    return {
      ...state,
      timer: state.timer - 1,
    };
  case actionTypes.TIMER_RESET:
    return {
      ...state,
      timer: 30,
    };
  case actionTypes.SCORE_UPDATE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
