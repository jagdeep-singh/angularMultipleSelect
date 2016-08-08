(function () {

    angular.module('multipleSelect').controller('homeController', function ($scope) {
        $scope.apiPath = "web/resources/skills.json";

        $scope.skillsList = [
            {id: 1, name : "Java"},
            {id: 2, name : "C"},
            {id: 3, name : "C++"},
            {id: 4, name : "Core Java"},
            {id: 5, name : "JavaScript"},
            {id: 6, name : "PHP"},
            {id: 7, name : "HTML"},
            {id: 8, name : "CSS"},
            {id: 9, name : "Angular Js"},
            {id: 10, name : "Bootstrap"}
        ];

        $scope.skillsList1 = [
            "Java",
            "C",
            "C++",
            "Core Java",
            "Javascript",
            "PHP",
            "MySql",
            "Hibernate",
            "Spring",
            "AngularJs",
            "BackboneJs",
            "Sencha Touch",
            "ExtJs"
        ];

        $scope.selectItemCallback = function(item){
            $scope.selectedItem = item;
        };

        $scope.removeItemCallback = function(item){
            $scope.removedItem = item;
        };

        $scope.onSubmit = function () {
            console.log("submit");
            if($scope.multipleSelectForm.$invalid){
                if($scope.multipleSelectForm.$error.required != null){
                    $scope.multipleSelectForm.$error.required.forEach(function(element){
                        element.$setDirty();
                    });
                }
                return null;
            }
            alert("valid field");
        };
    });
})();