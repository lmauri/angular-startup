var Globals = {
    AppModuleName: 'MyApp'
};

(function () {
    'use strict';

    var app = angular.module(Globals.AppModuleName, ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

    app
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin'
        });

    app
        // Lazy loading, http://ify.io/lazy-loading-in-angularjs
        .config(['$controllerProvider', function ($controllerProvider) {
            app.controllerProvider = $controllerProvider;
        }])
        .config(function ($stateProvider, $locationProvider, $urlRouterProvider, USER_ROLES) {
            $locationProvider.html5Mode(true).hashPrefix('!');

            $urlRouterProvider.otherwise('/admin');

            $stateProvider
                .state('admin', {
                    url: '/admin',
                    templateUrl: '/app/admin/admin.html',
                    data: {
                        authorizedRoles: [USER_ROLES.admin]
                    }
                })
                .state("otherwise", {
                    url: "*path",
                    templateUrl: '/app/common/views/404.html'
                });
        });

    app
        .run(function ($rootScope, AUTH_EVENTS, AuthService) {
            console.log("Trak app started at " + (new Date()).toString());

            $rootScope.$on('$stateChangeStart', function (event, next) {

            });
        });

})();