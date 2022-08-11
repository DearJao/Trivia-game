// Esse reducer será responsável por tratar as informações da API TRIVIA
import actionTypes from '../actionTypes';
import getQuestionsWithSortedAnswers from '../../utils/helperFunctions';

const INITIAL_STATE = {
  isLoading: true,
  questions: {},
  isTokenInvalid: false,
  error: '',
};

const apiReducer = (state = INITIAL_STATE, action) => {
  const invalidCode = 3;
  switch (action.type) {
  case actionTypes.FETCH_REQUEST_QUESTION:
    return {
      ...state,
      isLoading: true,
      error: '',
    };
  case actionTypes.FETCH_SUCCESS_QUESTIONS:
    return {
      ...state,
      isLoading: false,
      questions: {
        ...action.payload,
        results: [...getQuestionsWithSortedAnswers(action.payload.results)],
      },
      isTokenInvalid: action.payload.response_code === invalidCode,
      error: '',
    };

  case actionTypes.FETCH_FAILURE:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default apiReducer;
