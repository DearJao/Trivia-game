// Esse reducer será responsável por tratar as informações da API TRIVIA
// import actionTypes from '../actionTypes';

// const INITIAL_STATE = {
//   isLoading: false,
//   token: '',
// };

// const apiReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//   case actionTypes.FETCH_REQUEST_TOKEN:
//     return {
//       ...state,
//       isLoading: true,
//     };
//   case actionTypes.FETCH_SUCCESS_TOKEN:
//     return {
//       ...state,
//       isLoading: false,
//       token: action.payload.token,
//     };
//   default:
//     return state;
//   }
// };

export default apiReducer;
