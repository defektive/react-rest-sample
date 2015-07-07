var axios = require('axios');
import DataStore from "./DataStore";

var LOGGED_IN_KEY = 'loggedIn',
    USER_ID_KEY = 'userId',
    ACCESS_TOKEN_KEY = 'accessToken';

function Auth(){  DataStore.apply(this, arguments)  }

function login(response){
  this.set(LOGGED_IN_KEY, true)
  this.set(USER_ID_KEY, response.data.id)
  this.set(ACCESS_TOKEN_KEY, response.data.access_token)
}

Auth.prototype = Object.create(DataStore.prototype);

Auth.prototype.login = function (email, password) {
  axios.post('/v1/login', {
    email: email,
    password: password
  })
  .then(login.bind(this))
  .catch(function (response) {
    this.logout();
    this.handleErrorResponse(response);
  }.bind(this));
}

Auth.prototype.signUp = function (email, password, passwordConfirm) {
  axios.post('/v1/users', {
    user: {
      email: email,
      password: password,
      password_confirmation: passwordConfirm
    }
  })
  .then(login.bind(this))
  .catch(function (response) {
    this.logout();
    this.handleErrorResponse(response)
  });
}

Auth.prototype.isLoggedIn = function () {
  return this.get(LOGGED_IN_KEY)
}

Auth.prototype.getAccessToken = function () {
  return this.get(ACCESS_TOKEN_KEY)
}

Auth.prototype.logout = function () {
  this.set(ACCESS_TOKEN_KEY, null);
  this.set(LOGGED_IN_KEY, false);
}

Auth.prototype.handleErrorResponse = function (response) {
  var error = {
    status: response.status,
    statusText: response.statusText,
    description: response.data
  }

  this.emitError(error);
}

var auth = new Auth
export default auth
