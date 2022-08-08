// Esse reducer será responsável por tratar as informações da API TRIVIA
import actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: true,
  questions: {},
  isInvalid: false,
};

const apiReducer = (state = INITIAL_STATE, action) => {
  const validCode = 3;
  switch (action.type) {
  case actionTypes.FETCH_REQUEST_QUESTION:
    return {
      ...state,
      isLoading: true,
    };
  case actionTypes.FETCH_SUCCESS_QUESTIONS:
    return {
      ...state,
      isLoading: false,
      questions: action.payload,
      isInvalid: action.payload.response_code === validCode,
    };
  default:
    return state;
  }
};

export default apiReducer;
