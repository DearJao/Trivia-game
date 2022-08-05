import actionTypes from '../actionTypes';

// const URL_GET_TOKEN = 'https://opentdb.com/api_token.php?command=request';
// const URL_GET_QUESTIONS = 'https://opentdb.com/api.php?amount=5&token=';

export const executeLogin = (email) => ({
  type: actionTypes.LOGIN,
  payload: email,
});

const fetchRequestToken = () => ({
  type: actionTypes.FETCH_REQUEST_TOKEN,
});

// const fetchRequestQuestions = () => ({
//   type: actionTypes.FETCH_REQUEST_QUESTION,
// });

const fetchSucessToken = (data) => ({
  type: actionTypes.FETCH_SUCCESS_TOKEN,
  payload: data,
});

// const fetchSucessQuestions= (data) => ({
//   type: actionTypes.FETCH_SUCCESS_QUESTIONS,
//   payload: data,
// });

const fetchFailure = (error) => ({
  type: actionTypes.FETCH_FAILURE,
  payload: error.message,
});

export function fetchToken() {
  return (dispatch) => {
    dispatch(fetchRequestToken());
    fetch(URL)
      .then((response) => response.json())
      .then((token) => {
        dispatch(fetchSucessToken(token));
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(fetchFailure(error));
      });
  };
}
