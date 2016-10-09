

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','ngCordovaOauth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function ($scope,$cordovaOauth, $http) {

  $scope.login = function () {
    $cordovaOauth.linkedin( '<client_id>', '<client_secret>' ,  ['r_basicprofile', 'r_emailaddress'],{'redirect_uri':''}).then(function (d) {
        console.log('linkedin response',d);

        $http({method: 'GET', url: 'https://api.linkedin.com/v1/people/~:(id,firstName,lastName,num-connections,picture-url,location,industry,emailAddress,positions)?format=json', headers: {
          'Authorization': 'Bearer ' + d.access_token }
        }).then(function (data) {

          if(data.status == 200){

            var userData = data.data;
            console.log('user profile',userData);
alert('successful login');
         alert(JSON.stringify(userData));

          }
        },function(e){
          console.error('linkedin info query error',JSON.stringify(e));
        });

      },
      function (error) {
        console.error('linkedin sign in error',error);
      });
  };

});
