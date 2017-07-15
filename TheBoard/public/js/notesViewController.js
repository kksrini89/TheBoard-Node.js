(function (angular) {
    
    var app = angular.module("notesView");
    app.controller("notesViewController", ['$scope', '$window', 'notesService', function ($scope, $window, notesService) {
            $scope.notes = [];
            var urlParts = $window.location.pathname.split('/');
            var categoryName = urlParts[urlParts.length - 1];
            var notesUrl = "/api/notes/" + categoryName;
            notesService.getNotes(notesUrl)
                        .then(function (result) {
                $scope.notes = result.data
            }, function (error) {
                console.log(error);
            });
        }]);
})(window.angular);