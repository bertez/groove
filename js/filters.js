/* global angular */

'use strict';

var grooveAppFiltes = angular.module('grooveApp.filters', []);

grooveAppFiltes.filter('parseLapse', function() {
    return function(input) {
        if (input <= 0) {
            return '--';
        } else {
            var hours = Math.floor(input / 60);
            var minutes = input % 60;

            var hoursString = hours > 0 ? hours + 'h ' : '';
            var minutesString = minutes > 0 ? minutes + 'm ' : '';

            return (hoursString + minutesString).trim();
        }
    };
});