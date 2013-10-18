// Adapted from: https://github.com/pkozlowski-opensource/angularjs-mongolab

angular.module('folResource', ['ngResource']).factory('$folResource', ['$resource', 'FOL_API_URL',
  function($resource, FOL_API_URL) {

//    console.log($resource)

    function folResourceFactory(tableName) {

      var resource = $resource(FOL_API_URL + tableName + '/:id', {
        s: '{"updated": -1}'
      }, {
        update: {
          method: 'PUT'
        }
      });

      resource.getById = function(id, cb, errorcb) {
        return resource.get({
          id: id
        }, cb, errorcb);
      };

      resource.prototype.update = function(cb, errorcb) {
        return resource.update({
          id: this.id
        }, angular.extend({}, this, {
          id: undefined
        }), cb, errorcb);
      };

      resource.prototype.saveOrUpdate = function(savecb, updatecb, errorSavecb, errorUpdatecb) {
        if (this.id) {
          return this.update(updatecb, errorUpdatecb);
        } else {
          return this.$save(savecb, errorSavecb);
        }
      };

      resource.prototype.remove = function(cb, errorcb) {
        return resource.remove({
          id: this.id
        }, cb, errorcb);
      };

      resource.prototype['delete'] = function(cb, errorcb) {
        return this.remove(cb, errorcb);
      };

      return resource;
    }

    return folResourceFactory;
  }
]);