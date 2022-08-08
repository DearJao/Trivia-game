// Esse reducer será responsável por tratar as informações da pessoa usuária
import actionTypes from '../actionTypes';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  default:
    return state;
  }
};

export default userReducer;
