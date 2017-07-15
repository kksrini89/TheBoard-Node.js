(function (angular) {
    var app = angular.module('notesView');
    
    app.factory('notesService', ['$http', function ($http) {
            
            var getNotes = function (url) {
                return $http.get(url);
            }
            return {
                getNotes: getNotes
            };
        }]);
})(window.angular);