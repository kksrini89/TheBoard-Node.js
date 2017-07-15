(function (angular) {
    
    var app = angular.module("notesView");
    app.controller("notesViewController", ['$scope', '$window', 'notesService', function ($scope, $window, notesService) {
            $scope.notes = [];
            $scope.newNote = createNewBlankNote();
            var urlParts = $window.location.pathname.split('/');
            var categoryName = urlParts[urlParts.length - 1];
            var notesUrl = "/api/notes/" + categoryName;
            
            notesService.getNotes(notesUrl)
            .then(function (result) {
                $scope.notes = result.data
            }, function (error) {
                console.log(error);
            });
            
            $scope.saveNote = function() {
                console.log($scope.newNote);
                notesService.addNewNote(notesUrl, $scope.newNote)
                .then(function (result) {
                    $scope.notes.push(result.data);
                    $scope.newNote = createNewBlankNote();
                }, function (error) {
                    alert(error);
                });
            }
        }]);
    
    function createNewBlankNote() {
        return {
            note: "",
            color: "yellow"
        };
    }
})(window.angular);