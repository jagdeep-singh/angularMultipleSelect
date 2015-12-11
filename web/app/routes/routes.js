'use strict';
(function () {
    angular.module('multipleSelect').config( function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                controller: 'homeController',
                templateUrl:'app/home/home.tpl.html'
            });
		$urlRouterProvider.when('','/home');
        //$locationProvider.html5Mode(true);
        //$urlRouterProvider.otherwise('/home');
    });
})();