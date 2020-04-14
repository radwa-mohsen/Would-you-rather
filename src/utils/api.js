import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  _getSelectedUser
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
    _getSelectedUser()
  ]).then(([users, questions,authedUser]) => ({
    users,
    questions,
    authedUser
  }))
}

export function saveQuestion (question) {
  return _saveQuestion(question)
}

export function saveQuestionAnswer (info) {
  return _saveQuestionAnswer(info)
}