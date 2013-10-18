/* global angular */

'use strict';

var grooveApp = angular.module('grooveApp', [
    'ngRoute',
    'ngResource',
    'folResource',
    'LocalStorageModule',
    'grooveApp.controllers',
    'grooveApp.directives',
    'grooveApp.filters',
    'grooveApp.services'
]);

grooveApp.constant('FOL_API_URL', 'http://localhost/grooveApp/api/');
grooveApp.constant('AVAILABLE_ROLES', ['designer', 'developer', 'coordinator', 'administrative', 'content manager']);

grooveApp.config(function($routeProvider) {
    $routeProvider
        .when('/log', {
            templateUrl: 'views/log.html',
            resolve : {
                users: function(UserList) {
                    return new UserList.all({active: true}, true);
                },
                projects: function(ProjectList) {
                    return new ProjectList.all({active: true}, true);
                }
            },
            controller: 'LogCtrl'
        })
        .when('/projects', {
            templateUrl: 'views/projects.html',
            resolve: {
                projects: function(ProjectList) {
                    return new ProjectList.all();
                }
            },
            controller: 'ProjectsCtrl'
        })
        .when('/projects/view/:projectId', {
            templateUrl: 'views/project.html',
            resolve: {
                project: function(SingleProject, $route) {
                    return new SingleProject($route.current.params.projectId);
                },
                usersById: function(UserList) {
                    return new UserList.all({active: true}, true);
                },
                lapses: function(LapseList, $route){
                    return new LapseList($route.current.params.projectId);
                }
            },
            controller: 'ProjectViewCtrl'
        })
        .when('/projects/edit/:projectId', {
            templateUrl: 'views/projectForm.html',
            resolve: {
                project: function(SingleProject, $route) {
                    return new SingleProject($route.current.params.projectId);
                }
            },
            controller: 'ProjectEditCtrl'
        })
        .when('/projects/new', {
            templateUrl: 'views/projectForm.html',
            controller: 'ProjectNewCtrl'
        })
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UsersCtrl',
            resolve: {
                users: function (UserList){
                    return new UserList.all();
                }
            }
        })
        .when('/users/edit/:userId', {
            templateUrl: 'views/userForm.html',
            resolve: {
                user: function (SingleUser, $route){
                    return new SingleUser($route.current.params.userId);
                }
            },
            controller: 'UserEditCtrl'
        })
        .when('/users/new', {
            templateUrl: 'views/userForm.html',
            controller: 'UserNewCtrl',
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        })
        .otherwise({
            redirectTo: '/log'
        });
});