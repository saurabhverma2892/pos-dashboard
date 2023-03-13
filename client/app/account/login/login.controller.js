'use strict';

class LoginController {
  constructor(Auth, $state) {
    
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        username: this.user.username,
        merchcode: this.user.merchcode
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('dashboard.dashboardview');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('dashboardApp')
  .controller('LoginController', LoginController);
