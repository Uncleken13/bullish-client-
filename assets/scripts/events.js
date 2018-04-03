'use scrict'
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
require('../../node_modules/jquery-toast-plugin/src/jquery.toast.js')
require('../../node_modules/jquery-toast-plugin/src/jquery.toast.css')

let dataId
let selection

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  if (document.getElementById('password-field').value !==
    document.getElementById('password-confirmation').value) {
    console.log('what the fuck')
    $.toast({
      text: 'Thank you Mr. Crockett',
      heading: 'Sign up failure!',
      icon: 'warning',
      showHideTransition: 'slide',
      allowToastClose: true,
      hideAfter: 3000,
      stack: 5,
      position: 'top-left',
      textAlign: 'left',
      loader: true,
      loaderBg: 'red',
      bgColor: 'red',
      textColor: 'black'
    })
    $('#email-field').val('')
    $('#password-field').val('')
    $('#password-confirmation').val('')
  } else {
    api.signUp(data)
      .then(ui.signUpSuccess)
      .catch(ui.signUpFailure)
  }

// const confirmation = function (event) {
//   event.preventDefault()
//   if (document.getElementById('password-field').value !==
//     document.getElementById('password-confirmation').value) {
//     console.log('what the fuck')
//   } else {
//     onSignUp()
//   }

  // $('#password-field, #password-confirmation').on('keyup', function () {
  //   if ($('#password-field').val() === $('#password-confirmation').val()) {
  //     console.log('we protected motherfuckas')
  //   } else {
  //     console.log('do not match')
  //     return
  //   }
  // })
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changeSuccess)
    .catch(ui.changeFailure)
}

const onSignOut = function () {
  event.preventDefault()

  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onCreateSurvey = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.createSurvey(data)
    .then(ui.createSuccessful)
    .catch(ui.createFailed)
}

const onShowAllSurveys = function (event) {
  event.preventDefault()
  api.showAllSurveys()
    .then(ui.showAllSuccess)
    .catch(ui.showAllFailure)
}

const onShowOneSurvey = function (event) {
  event.preventDefault()
  dataId = $(event.target).attr('data-id')
  api.showOneSurvey(dataId)
    .then(ui.showOneSuccess)
    .catch(ui.showOneFailure)
}

const onUpdateSurvey = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateSurvey(data)
    .then(ui.updateSuccess)
    .catch(ui.updateFailed)
}

const onDeleteSurvey = function (event) {
  event.preventDefault()

  const data = getFormFields(event.target)
  api.deleteSurvey(data)
    .then(ui.deleteSuccess)
    .catch(ui.deleteFailed)
}

// response needs a surveyid and selected (value name)
const onCreateResponse = function (event) {
  event.preventDefault()

  api.createResponse(selection, dataId)
    .then(ui.createResponseSuccessful)
    // .catch(ui.createFailed)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('click', onSignOut)
  $('#create').on('submit', onCreateSurvey)
  $('#showAll').on('submit', onShowAllSurveys)
  $('#update').on('submit', onUpdateSurvey)
  $('#delete').on('submit', onDeleteSurvey)
  $('a.show-form').on('click', function () {
    $('#sign-up').toggle()
  })
  $('a.show-pass').on('click', function () {
    $('#change-password').toggle()
  })
  $('body').on('click', '#voteNowButton', onShowOneSurvey)
  $('a.show-in').on('click', function () {
    $('#sign-in').toggle()
  })
  $('#showOptionOne').on('click', () => {
    selection = 0
  })
  $('#showOptionTwo').on('click', () => {
    selection = 1
  })
  $('.create-response-button').on('click', onCreateResponse)
}

module.exports = {
  addHandlers
}
