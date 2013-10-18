/* global angular */

'use strict';

var grooveAppServices = angular.module('grooveApp.services', []);

//Projects
grooveAppServices.factory('Project', ['$folResource',
    function($folResource) {
        return $folResource('projects');
    }
]);

grooveAppServices.factory('ProjectList', ['Project', '$q',
    function(Project, $q) {

        return {
            all: function(query, grouped) {
                var delay = $q.defer();

                query = query || {};

                Project.query({
                    q: JSON.stringify(query)
                }, function(projects) {

                    if (grouped) {
                        var projecList = {};

                        angular.forEach(projects, function(p) {
                            projecList[p.id] = {
                                name: p.name,
                                description: p.description,
                                booked: p.booked,
                                updated: p.updated
                            };
                        });
                        projects = projecList;
                    }

                    delay.resolve(projects);
                }, function() {
                    delay.reject('Error loading Projects');
                });

                return delay.promise;
            }
        };
    }
]);

grooveAppServices.factory('SingleProject', ['Project', '$q',
    function(Project, $q) {
        return function(projectId) {
            var delay = $q.defer();
            Project.get({
                id: projectId
            }, function(project) {
                delay.resolve(project);
            }, function() {
                delay.reject('Error loading project: ' + projectId);
            });

            return delay.promise;
        };
    }
]);

//Lapses
grooveAppServices.factory('Lapse', ['$folResource',
    function($folResource) {
        return $folResource('lapses');
    }
]);

grooveAppServices.factory('LapseList', ['Lapse', '$q',
    function(Lapse, $q) {
        return function(projectId) {
                var delay = $q.defer();

                Lapse.query({
                    q: JSON.stringify({id_project: projectId})
                }, function(lapses) {
                    delay.resolve(lapses);
                }, function() {
                    delay.reject('Error loading Lapses');
                });
                return delay.promise;
            };
    }
]);

//Users
grooveAppServices.factory('User', ['$folResource',
    function($folResource) {
        return $folResource('users');
    }
]);

grooveAppServices.factory('UserList', ['User', '$q',
    function(User, $q) {

        return {
            all: function(query, grouped) {
                var delay = $q.defer();

                query = query || {};

                User.query({
                    q: JSON.stringify(query)
                }, function(users) {

                    if (grouped) {
                        var userList = {};

                        angular.forEach(users, function(u) {
                            userList[u.id] = {
                                name: u.name,
                                email: u.email,
                                role: u.role
                            };
                        });
                        users = userList;
                    }

                    delay.resolve(users);
                }, function() {
                    delay.reject('Error loading Users');
                });

                return delay.promise;
            }
        };
    }
]);

grooveAppServices.factory('SingleUser', ['User', '$q',
    function(User, $q) {
        return function(userId) {
            var delay = $q.defer();

            User.get({
                id: userId
            }, function(user) {
                delay.resolve(user);
            }, function() {
                delay.reject('Error loading User: ' + userId);
            });

            return delay.promise;
        };
    }
]);