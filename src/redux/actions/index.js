import actionTypes from '../actionTypes';

export const executeLogin = (email, name) => ({
  type: actionTypes.LOGIN,
  payload: { email, name },
});

const doFetchRequestQuestions = () => ({
  type: actionTypes.FETCH_REQUEST_QUESTION,
});

const doFetchSucessQuestions = (data) => ({
  type: actionTypes.FETCH_SUCCESS_QUESTIONS,
  payload: data,
});

const doFetchFailure = (error) => ({
  type: actionTypes.FETCH_FAILURE,
  payload: error.message,
});

export function doFetchQuestions(url) {
  return (dispatch) => {
    dispatch(doFetchRequestQuestions());
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dispatch(doFetchSucessQuestions(data));
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(doFetchFailure(error));
      });
  };
}

export const timerDecreasing = () => ({
  type: actionTypes.TIMER_DECREASING,
});

export const timerReset = () => ({
  type: actionTypes.TIMER_RESET,
});

export const updateScore = (newScore) => ({
  type: actionTypes.SCORE_UPDATE,
  payload: newScore,
});