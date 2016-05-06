var app =angular.module('starter', ['ionic', 'firebase' ,'ngCordova','btford.socket-io']);

app.constant('furl','https://torrid-inferno-2262.firebaseio.com/');
app.constant('furlUser','https://torrid-inferno-2262.firebaseio.com/users');
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {

 $stateProvider

.state('SignIn', {
   url: '/SignIn',
   templateUrl: 'templates/signIn.html',
   controller: 'UserCtrl'
})
.state('SignUp', {
   url: '/SignUp',
   templateUrl: 'templates/signUp.html',
   controller: 'UserCtrl'
})
.state('UserData', {
   url: '/UserData',
   templateUrl: 'templates/userData.html',
   controller: 'UserCtrl'
})

.state('tab', {
  url: '/tab',
  abstract: true,
  templateUrl: 'templates/tabs.html'
})

.state('tab.dash', {
  url: '/dash',
  views: {
    'tab-dash': {
      templateUrl: 'templates/tab-dash.html',
      controller: 'DashCtrl'
    }
  }
})

.state('tab.map', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

.state('tab.list', {
  url: '/account',
  views: {
    'tab-account': {
      templateUrl: 'templates/tab-list.html',
      controller: 'AccountCtrl'
    }
  }
})

.state('chat', {
        url: "/chat/:nickname",
        templateUrl: "templates/myChat.html",
		controller: 'ChatController'
      });

  $urlRouterProvider.otherwise('/SignIn');

});
