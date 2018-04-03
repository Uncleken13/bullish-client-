const store = require('./store')
const showSurveysTemplate = require('./templates/survey-list.handlebars')
require('../../node_modules/jquery-toast-plugin/src/jquery.toast.js')
require('../../node_modules/jquery-toast-plugin/src/jquery.toast.css')

let zeros
let ones

const signUpSuccess = function (data) {
  $('#email-field').val('')
  $('#password-field').val('')
  $('#password-confirmation').val('')
  $('#sign-up').hide()

  $.toast({
    text: 'Thank you Mr. Crockett',
    heading: 'Sign up success!',
    icon: 'success',
    showHideTransition: 'slide',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-left',
    textAlign: 'left',
    loader: true,
    loaderBg: '#fed',
    bgColor: '#green',
    textColor: 'black'
  })
}

const signUpFailure = function () {
  // $('#message').text('Opps, Sign up Error. Please try again')
  // $('#message').css('background-color', 'red')
  $('#email-field').val('')
  $('#password-field').val('')
  $('#password-confirmation').val('')

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
}

const signInSuccess = function (data) {
  // $('#message').text('Sign In Success!!! Let\'s create a survey')
  // $('#message').css('color', 'white')
  // $('#message').css('background-color', 'green')
  // $('#message').hide(9000)
  $('#signInEmail').val('')
  $('#signInPassword').val('')
  $('.container').show()
  $('#sign-in').hide()
  // $('#change-password').show()
  $('#sign-out').show()
  $('#create').show()
  $('#showAll').show()
  $('#update').show()
  $('#delete').show()
  $('#all-users').show()
  $('.show-form').hide()
  $('.show-in').hide()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#showPass').show()
  $('#sign-out').show()
  $('body').css('background-image', 'none')
  $('#handlebars-here').show()
  store.user = data.user
}

const signInFailure = function () {
  $('#signInEmail').val('')
  $('#signInPassword').val('')

  $.toast({
    text: 'Thank you Mr. Crockett',
    heading: 'Sign in failed!',
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
    textColor: 'white'
  })
}

const changeSuccess = function () {
  // $('#message').text('NO ONE SHALL PASS!!!-Changed Password Success')
  // $('#message').css('background-color', 'green')
  $('#oldPasswordField').val('')
  $('#newPasswordField').val('')

  $.toast({
    text: 'Thank you Mr. Crockett',
    heading: 'Change password success!',
    icon: 'success',
    showHideTransition: 'slide',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-left',
    textAlign: 'left',
    loader: true,
    loaderBg: '#fed',
    bgColor: '#def',
    textColor: 'black'
  })
}

const changeFailure = function () {
  // $('#message').text('Oops, error changing password. Please try again.')
  // $('#message').css('background-color', 'red')
  $('#oldPasswordField').val('')
  $('#newPasswordField').val('')

  $.toast({
    text: 'Thank you Mr. Crockett',
    heading: 'Update failed',
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
}

const signOutSuccess = function () {
  // $('#message').text('Signed out Successful. Come Back Soon')
  // $('#message').css('background-color', 'green')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create').hide()
  $('#showAll').hide()
  $('#update').hide()
  $('#delete').hide()
  $('#content').hide()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('.show-form').show()
  $('.show-in').show()
  $('#sign-out').hide()
  $('#showPass').hide()
  $('#handlebars-here').hide()
  $('body').css('background-image', "url('https://i.imgur.com/3xpZwYo.jpg')")
}

const signOutFailure = function () {
  // $('#message').text('Signout Error, I thought you were leaving')
  // $('#message').css('background-color', 'red')
}

const showAllSuccess = function (data) {
  const showSurveysHTML = showSurveysTemplate({ surveys: data.surveys })
  $('#handlebars-here').html(showSurveysHTML)

  if (data.surveys.length === 0) {
    $('#handlebars-here').html('Someone needs to create a survey first!')
  }
}

const showOneSuccess = function (data) {
  store.survey = data.survey
  $('#showOptionOne').html(store.survey.optionOne)
  $('#showOptionTwo').html(store.survey.optionTwo)

  zeros = store.survey.responses.filter(x => x === 0)

  ones = store.survey.responses.filter(x => x === 1)

  $('#zeros').html('Votes for ' + store.survey.optionOne + ': ' + zeros.length)
  $('#ones').html('Votes for ' + store.survey.optionTwo + ': ' + ones.length)
}

const createSuccessful = function (data) {
  // $('#message').text('Survey Created')
  // $('#message').css('background-color', 'green')
  $('#createOptionOne').val('')
  $('#createOptionTwo').val('')
  $('#handlebars-here').html('Click show my surveys to see changes')

  $.toast({
    text: 'Thank you Mr. Crockett',
    heading: 'Created a survey!',
    icon: 'success',
    showHideTransition: 'slide',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-left',
    textAlign: 'left',
    loader: true,
    loaderBg: 'white',
    bgColor: 'white',
    textColor: 'black'
  })
}

const createFailed = function (data) {
  // $('#message').text('Creation Failed, Please try again')
  // $('#message').css('background-color', 'red')
  $('#createSurvey').val('')

  $.toast({
    text: 'Thank you Mr. Crockett',
    heading: 'You failed to create?!?!?',
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
}

const updateSuccess = function () {
  // $('#message').text('Survey Updated')
  // $('#message').css('background-color', 'green')
  $('#updateId').val('')
  $('#updateOptionOne').val('')
  $('#updateOptionTwo').val('')
  $('#handlebars-here').html('Click show my surveys to see changes')

  $.toast({
    text: 'Thank you Mr. Crockett',
    heading: 'Update success! Click on \'See my surveys\' to see updated info',
    icon: 'success',
    showHideTransition: 'slide',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-left',
    textAlign: 'left',
    loader: true,
    loaderBg: '#fed',
    bgColor: '#def',
    textColor: 'black'
  })
}

const updateFailed = function (data) {
  // $('#message').text('Problem Updating, Please try again')
  // $('#message').css('background-color', 'red')
  $('#updateId').val('')
  $('#updateOptionOne').val('')
  $('#updateOptionTwo').val('')

  $.toast({
    text: 'Thank you Mr. Crockett',
    heading: 'Update failed! Use a valid id, or make sure you are the one who created this survey',
    icon: 'warning',
    showHideTransition: 'slide',
    allowToastClose: true,
    hideAfter: 6000,
    stack: 5,
    position: 'top-left',
    textAlign: 'left',
    loader: true,
    loaderBg: 'red',
    bgColor: 'red',
    textColor: 'black'
  })
}

const deleteSuccess = function () {
  // $('#message').text('Delete Successfully')
  // $('#message').css('background-color', 'green')
  $('#deleteSurvey').val('')
  $('#handlebars-here').html('Click show my surveys to see changes')

  $.toast({
    text: 'Thank you Mr. Crockett',
    heading: 'Delete successful',
    icon: 'success',
    showHideTransition: 'slide',
    allowToastClose: true,
    hideAfter: 6000,
    stack: 5,
    position: 'top-left',
    textAlign: 'left',
    loader: true,
    loaderBg: 'green',
    bgColor: 'green',
    textColor: 'black'
  })
}

const deleteFailed = function () {
  // $('#message').text('Failed to Delete')
  // $('#message').css('background-color', 'red')
  $('#deleteSurvey').val('')

  $.toast({
    text: 'Thank you Mr. Crockett',
    heading: 'Delete failed! Use a valid id, or make sure you are the one who created this survey',
    icon: 'warning',
    showHideTransition: 'slide',
    allowToastClose: true,
    hideAfter: 6000,
    stack: 5,
    position: 'top-left',
    textAlign: 'left',
    loader: true,
    loaderBg: 'red',
    bgColor: 'red',
    textColor: 'black'
  })
}

const createResponseSuccessful = function () {
  $('#vote').modal('hide')

  $.toast({
    text: 'Thank you Mr. Crockett',
    heading: 'You Just Voted!',
    icon: 'success',
    showHideTransition: 'slide',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-left',
    textAlign: 'left',
    loader: true,
    loaderBg: '#fed',
    bgColor: '#def',
    textColor: 'black'
  })
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changeSuccess,
  changeFailure,
  signOutSuccess,
  signOutFailure,
  createSuccessful,
  createFailed,
  showAllSuccess,
  showOneSuccess,
  updateSuccess,
  updateFailed,
  deleteSuccess,
  deleteFailed,
  createResponseSuccessful
}
