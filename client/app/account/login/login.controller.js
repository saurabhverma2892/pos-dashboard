'use strict';

class LoginController {
  constructor(Auth, $state, apiToken, $scope,$cookies) {
    self = this;
    self.$cookies = $cookies;
    self.$state = $state;
    this.user = {};
    this.errors = {};
    this.submitted = false;
    this.apiToken = apiToken;
    self.apiToken = apiToken;
    this.Auth = Auth;
    this.$state = $state;
    this.apiLogin = false;
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
        if(this.apiToken.apiToken != "")
        {
          this.$state.go('dashboard.dashboardview');
        }
        else
        {
          this.apiLogin = true;
        }
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }

  apiLoginForm(form) {

    this.apiToken.apiLogin(this.user.apiusername, this.user.password).success(function(data){
      console.log(data);
      self.apiToken.apiToken = data.data.token;
      self.apiToken.data = data.data;
      self.$cookies.put('token2', data.data.token);
      self.$cookies.put('cloud_site_id', data.data.cloud_site_id);
      self.$cookies.put('restaurant_name', data.data.restaurant_name);

      self.$state.go('dashboard.dashboardview');

    })

  }





}

angular.module('dashboardApp')
  .controller('LoginController', LoginController);
