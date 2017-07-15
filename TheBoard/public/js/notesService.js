(function (angular) {
    var app = angular.module('notesView');
    
    app.factory('notesService', ['$http', function ($http) {
            
            var getNotes = function (url) {
                return $http.get(url);
            }
            
            var addNewNote = function (url, newNote) {
                return $http.post(url, JSON.stringify(newNote));
            }
            return {
                getNotes: getNotes,
                addNewNote: addNewNote
            };
        }]);
})(window.angular);