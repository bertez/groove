/* global angular, console, moment */

'use strict';

var grooveAppControllers = angular.module('grooveApp.controllers', []);

//Header
grooveAppControllers.controller('HeaderCtrl', ['$scope', '$location',
    function($scope, $location) {
        $scope.navList = [{
            url: '/log',
            name: 'Log'
        }, {
            url: '/projects',
            name: 'Projects'
        }, {
            url: '/users',
            name: 'Users'
        }, {
            url: '/about',
            name: 'About'
        }];

        $scope.isCurrent = function(viewLocation) {
            return $location.path().slice(0, viewLocation.length) === viewLocation;
        };
    }
]);

//Log
grooveAppControllers.controller('LogCtrl', ['$scope', 'users', 'projects', 'localStorageService', 'Lapse', 'SingleProject',
    function($scope, users, projects, localStorageService, Lapse, SingleProject) {
        $scope.users = users;
        $scope.projects = projects;

        $scope.logs = localStorageService.get('backupLogs') ? localStorageService.get('backupLogs') : [];

        $scope.lapse = {};

        $scope.save = function() {
            $scope.lapse.updated = moment().format("YYYY-MM-DD HH:mm:ss");
            $scope.logs.unshift($scope.lapse);

            $scope.lapse = {
                id_user: $scope.lapse.id_user,
                id_project: $scope.lapse.id_project
            };
        };

        $scope.sync = function() {

            var groupedLogs = {};

            angular.forEach($scope.logs, function(log) {

                groupedLogs[log.id_project] = groupedLogs[log.id_project] || [];

                groupedLogs[log.id_project].unshift({
                    id_project: log.id_project,
                    id_user: log.id_user,
                    amount: log.amount,
                    updated: log.updated
                });
            });

            angular.forEach(groupedLogs, function(value, key){
                SingleProject(key).then(function(project){
                    project.gone = parseInt(project.gone, 10);

                    angular.forEach(value, function(log){
                        project.gone += parseInt(log.amount, 10);
                        var lapse = new Lapse(log);
                        lapse.$save();
                    });

                    project.updated = moment().format("YYYY-MM-DD HH:mm:ss");
                    project.update();
                });
            });

            $scope.logs = [];
        };

        $scope.removeLog = function(logIndex) {
            $scope.logs.splice(logIndex, 1);
        };

        $scope.$watch('logs', function() {
            localStorageService.add('backupLogs', $scope.logs);
        }, true);
    }
]);


//Projects
grooveAppControllers.controller('ProjectsCtrl', ['$scope', 'projects',
    function($scope, projects) {
        $scope.projects = projects;

        $scope.checkOverTime = function(gone, booked) {
            if (parseInt(gone, 10) > parseInt(booked, 10)) return true;
            return false;
        };

        $scope.perCent = function(gone, booked) {
            return Math.floor((parseInt(gone, 10) * 100) / parseInt(booked, 10)) + '%';
        };
    }
]);

grooveAppControllers.controller('ProjectViewCtrl', ['$scope', 'project', 'usersById', '$location', 'lapses', 'Lapse',
    function($scope, project, usersById, $location, lapses, Lapse) {
        $scope.project = project;
        $scope.usersById = usersById;
        $scope.lapses = lapses;

        var calculateTimeSpent = function() {
            $scope.timeSpent = totalTimeCalculator($scope.lapses);
            $scope.project.gone = $scope.timeSpent;
            $scope.project.update();
        };

        $scope.$watch('lapses', calculateTimeSpent, true);

        $scope.getUserInfo = function(userId) {
            return usersById[userId];
        };

        $scope.parseDate = function(date) {
            return new Date(date);
        };

    }
]);

grooveAppControllers.controller('ProjectLapseCtrl', ['$scope', 'Lapse',
    function($scope, Lapse) {

        var resetLapse = function(u) {
            $scope.lapse = {
                id_project: $scope.project.id,
                updated: moment().format("YYYY-MM-DD HH:mm:ss")
            };

            if (u) {
                $scope.lapse.id_user = u;
            }
        };

        $scope.removeLapse = function(index, lapse) {
            Lapse.get({
                id: lapse
            }, function(lapse) {
                lapse.remove(function() {
                    $scope.lapses.splice(index, 1);
                });
            }, function() {
                console.log('error');
            });
        };

        $scope.addLapse = function() {
            var lapseToAdd = new Lapse($scope.lapse);

            lapseToAdd.$save(function(lapse) {
                $scope.lapse.id = lapse.id;
                $scope.lapses.unshift($scope.lapse);
                $scope.project.updated = moment().format("YYYY-MM-DD HH:mm:ss");
                $scope.project.update();
                resetLapse($scope.lapse.id_user);
            });
        };

        resetLapse();
    }
]);


grooveAppControllers.controller('ProjectEditCtrl', ['$scope', 'project', '$location',
    function($scope, project, $location) {
        $scope.project = project;

        $scope.edit_action = 'Edit';

        $scope.removeProject = function() {
            $scope.project.remove(function() {
                $location.path('projects');
            });
        };

        $scope.save = function() {
            $scope.project.update(function() {
                $location.path('/projects/view/' + $scope.project.id);
            });
        };
    }
]);

grooveAppControllers.controller('ProjectNewCtrl', ['$scope', 'Project', '$location',
    function($scope, Project, $location) {

        $scope.project = new Project({
            active: true,
            gone: 0,
            updated: moment().format("YYYY-MM-DD HH:mm:ss")
        });

        $scope.edit_action = 'Create';

        $scope.save = function() {
            $scope.project.$save(function(project) {
                $location.path('/projects/view/' + project.id);
            });
        };
    }
]);


//Users
grooveAppControllers.controller('UsersCtrl', ['$scope', 'users', 'UserList',
    function($scope, users, UserList) {
        $scope.users = users;
    }
]);

grooveAppControllers.controller('UserEditCtrl', ['$scope', 'user', '$location', 'AVAILABLE_ROLES',
    function($scope, user, $location, AVAILABLE_ROLES) {
        $scope.user = user;

        $scope.user.active = $scope.user.active ? true : false;

        $scope.edit_action = 'Edit';

        $scope.roles = AVAILABLE_ROLES;

        $scope.save = function() {
            $scope.user.updated = moment().format("YYYY-MM-DD HH:mm:ss");
            $scope.user.udpate(function() {
                $location.path('/users/');
            });
        };

        $scope.disableUser = function() {
            $scope.user.active = false;
            $scope.save();
        };
    }
]);

grooveAppControllers.controller('UserNewCtrl', ['$scope', 'User', '$location', 'AVAILABLE_ROLES',
    function($scope, User, $location, AVAILABLE_ROLES) {
        $scope.user = new User({
            updated: moment().format("YYYY-MM-DD HH:mm:ss"),
            active: true
        });

        $scope.edit_action = 'Create';

        $scope.roles = AVAILABLE_ROLES;

        $scope.save = function() {
            $scope.user.$save(function() {
                $location.path('/users/');
            });
        };
    }
]);


//About
grooveAppControllers.controller('AboutCtrl', ['$scope',
    function($scope) {

    }
]);


//Helpers

var totalTimeCalculator = function(lapses) {
    var totalTime = 0;

    angular.forEach(lapses, function(lapse) {
        totalTime += parseInt(lapse.amount, 10);
    });


    return totalTime;
};