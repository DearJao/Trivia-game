import actionTypes from '../actionTypes';

// const URL_GET_QUESTIONS = 'https://opentdb.com/api.php?amount=5&token=';

const executeLogin = (email, name) => ({
  type: actionTypes.LOGIN,
  payload: { email, name },
});

export default executeLogin;

// const fetchRequestToken = () => ({
//   type: actionTypes.FETCH_REQUEST_TOKEN,
// });

// const fetchRequestQuestions = () => ({
//   type: actionTypes.FETCH_REQUEST_QUESTION,
// });

// const fetchSucessToken = (data) => ({
//   type: actionTypes.FETCH_SUCCESS_TOKEN,
//   payload: data,
// });

// const fetchSucessQuestions= (data) => ({
//   type: actionTypes.FETCH_SUCCESS_QUESTIONS,
//   payload: data,
// });

// const fetchFailure = (error) => ({
//   type: actionTypes.FETCH_FAILURE,
//   payload: error.message,
// });

// export function fetchToken() {
//   return (dispatch) => {
//     dispatch(fetchRequestToken());
//     fetch(URL_GET_TOKEN)
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch(fetchSucessToken(data));
//       })
//       .catch((error) => {
//         console.log(error.message);
//         dispatch(fetchFailure(error));
//       });
//   };
// }
