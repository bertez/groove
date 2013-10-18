/* global angular,console */

'use strict';

var grooveAppDirectives = angular.module('grooveApp.directives', []);

grooveAppDirectives.directive('loadingBar', ['$rootScope', function($rootScope) {
  return {
    link: function(scope, element, attrs) {
      element.addClass('hide');

      $rootScope.$on('$routeChangeStart', function() {
        element.removeClass('hide');
      });

      $rootScope.$on('$routeChangeSuccess', function() {
        element.addClass('hide');
      });
    }
  };
}]);

grooveAppDirectives.directive('humanTime', [function(){
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, controller) {

      controller.$parsers.unshift(function (viewValue) {
        viewValue = viewValue || '';
        var pattern = /^((\d+)h)?\s*((\d+)m)?$/;
        var groups = viewValue.match(pattern);

        if(groups){
          var hours = parseInt(groups[2] || 0, 10);
          var minutes = parseInt(groups[4] || 0, 10);

          if(hours + minutes > 0){

            controller.$setValidity('lapse', true);
            return hours*60 + minutes;
          }
        } else {
          controller.$setValidity('lapse', false);
          return undefined;
        }

      });

      controller.$formatters.unshift(function(viewValue){
        if (viewValue <= 0) {
            return '';
        } else {
            var hours = Math.floor(viewValue / 60);
            var minutes = viewValue % 60;

            var hoursString = hours > 0 ? hours + 'h ' : '';
            var minutesString = minutes > 0 ? minutes + 'm ' : '';

            return (hoursString + minutesString).trim();
        }
      });
    }
  };
}]);