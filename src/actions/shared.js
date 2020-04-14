import { getInitialData } from "../utils/api";
import { reveiveUsers } from "../actions/users";
import { receiveQuestions } from "../actions/questions";
import { showLoading, hideLoading } from 'react-redux-loading'


export const handleInitialData = () => {
  return dispatch => {
    dispatch(showLoading())
    getInitialData().then(({ users, questions }) => {
      dispatch(reveiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading())
    });
  };
}
