(function () {

    angular.module('multipleSelect').directive('multipleAutocomplete', [
        '$filter',
        '$http',
        function ($filter, $http) {
            return {
                restrict: 'EA',
                scope : {
                    suggestionsArr : '=?',
                    modelArr : '=ngModel',
                    apiUrl : '@',
                    beforeSelectItem : '=?',
                    afterSelectItem : '=?',
                    beforeRemoveItem : '=?',
                    afterRemoveItem : '=?'
                },
                templateUrl: 'multiple-autocomplete-tpl.html',
                link : function(scope, element, attr){
                    scope.objectProperty = attr.objectProperty;
                    scope.selectedItemIndex = 0;
                    scope.name = attr.name;
                    scope.isRequired = attr.required;
                    scope.errMsgRequired = attr.errMsgRequired;
                    scope.isHover = false;
                    scope.isFocused = false;
                    var getSuggestionsList = function () {
                        var url = scope.apiUrl;
                        $http({
                            method: 'GET',
                            url: url
                        }).then(function (response) {
                            scope.suggestionsArr = response.data;
                        }, function (response) {
                            console.log("*****Angular-multiple-select **** ----- Unable to fetch list");
                        });
                    };

                    if(scope.suggestionsArr == null || scope.suggestionsArr == ""){
                        if(scope.apiUrl != null && scope.apiUrl != "")
                            getSuggestionsList();
                        else{
                            console.log("*****Angular-multiple-select **** ----- Please provide suggestion array list or url");
                        }
                    }

                    if(scope.modelArr == null || scope.modelArr == ""){
                        scope.modelArr = [];
                    }
                    scope.onFocus = function () {
                        scope.isFocused=true
                    };

                    scope.onMouseEnter = function () {
                        scope.isHover = true
                    };

                    scope.onMouseLeave = function () {
                        scope.isHover = false;
                    };

                    scope.onBlur = function () {
                        scope.isFocused=false;
                    };

                    scope.onChange = function () {
                        scope.selectedItemIndex = 0;
                    };

                    scope.keyParser = function ($event) {
                        var keys = {
                            38: 'up',
                            40: 'down',
                            8 : 'backspace',
                            13: 'enter',
                            9 : 'tab',
                            27: 'esc'
                        };
                        var key = keys[$event.keyCode];
                        if(key == 'backspace' && scope.inputValue == ""){
                            if(scope.modelArr.length != 0){
                                scope.removeAddedValues(scope.modelArr[scope.modelArr.length-1]);
                                //scope.modelArr.pop();
                            }
                        }
                        else if(key == 'down'){
                            var filteredSuggestionArr = $filter('filter')(scope.suggestionsArr, scope.inputValue);
                            filteredSuggestionArr = $filter('filter')(filteredSuggestionArr, scope.alreadyAddedValues);
                            if(scope.selectedItemIndex < filteredSuggestionArr.length -1)
                                scope.selectedItemIndex++;
                        }
                        else if(key == 'up' && scope.selectedItemIndex > 0){
                            scope.selectedItemIndex--;
                        }
                        else if(key == 'esc'){
                            scope.isHover = false;
                            scope.isFocused=false;
                        }
                        else if(key == 'enter'){
                            var filteredSuggestionArr = $filter('filter')(scope.suggestionsArr, scope.inputValue);
                            filteredSuggestionArr = $filter('filter')(filteredSuggestionArr, scope.alreadyAddedValues);
                            if(scope.selectedItemIndex < filteredSuggestionArr.length)
                                scope.onSuggestedItemsClick(filteredSuggestionArr[scope.selectedItemIndex]);
                        }
                    };

                    scope.onSuggestedItemsClick = function (selectedValue) {
                        if(scope.beforeSelectItem && typeof(scope.beforeSelectItem) == 'function')
                            scope.beforeSelectItem(selectedValue);

                        scope.modelArr.push(selectedValue);

                        if(scope.afterSelectItem && typeof(scope.afterSelectItem) == 'function')
                            scope.afterSelectItem(selectedValue);
                        scope.inputValue = "";
                    };

                    var isDuplicate = function (arr, item) {
                        var duplicate = false;
                        if(arr == null || arr == "")
                            return duplicate;

                        for(var i=0;i<arr.length;i++){
                            duplicate = angular.equals(arr[i], item);
                            if(duplicate)
                                break;
                        }
                        return duplicate;
                    };

                    scope.alreadyAddedValues = function (item) {
                        var isAdded = true;
                        isAdded = !isDuplicate(scope.modelArr, item);
                        //if(scope.modelArr != null && scope.modelArr != ""){
                        //    isAdded = scope.modelArr.indexOf(item) == -1;
                        //    console.log("****************************");
                        //    console.log(item);
                        //    console.log(scope.modelArr);
                        //    console.log(isAdded);
                        //}
                        return isAdded;
                    };

                    scope.removeAddedValues = function (item) {
                        if(scope.modelArr != null && scope.modelArr != "") {
                            var itemIndex = scope.modelArr.indexOf(item);
                            if (itemIndex != -1) {
                                if(scope.beforeRemoveItem && typeof(scope.beforeRemoveItem) == 'function')
                                    scope.beforeRemoveItem(item);

                                scope.modelArr.splice(itemIndex, 1);

                                if(scope.afterRemoveItem && typeof(scope.afterRemoveItem) == 'function')
                                    scope.afterRemoveItem(item);
                            }
                        }
                    };

                    scope.mouseEnterOnItem = function (index) {
                        scope.selectedItemIndex = index;
                    };
                }
            };
        }
    ]);
})();