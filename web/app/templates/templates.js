angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("multiple-autocomplete-tpl.html","<div class=\"ng-ms form-item-container\">\n    <ul class=\"list-inline\">\n        <li ng-repeat=\"item in modelArr\">\n			<span ng-if=\"objectProperty == undefined || objectProperty == \'\'\">\n				{{item}} <span class=\"remove\" ng-click=\"removeAddedValues(item)\">\n                <i class=\"glyphicon glyphicon-remove\"></i></span>&nbsp;\n			</span>\n            <span ng-if=\"objectProperty != undefined && objectProperty != \'\'\">\n				{{item[objectProperty]}} <span class=\"remove\" ng-click=\"removeAddedValues(item)\">\n                <i class=\"glyphicon glyphicon-remove\"></i></span>&nbsp;\n			</span>\n        </li>\n        <li>\n            <input name=\"{{name}}\" ng-model=\"inputValue\" placeholder=\"{{placeholder}}\" ng-keydown=\"keyParser($event)\"\n                   err-msg-required=\"{{errMsgRequired}}\"\n                   ng-focus=\"onFocus()\" ng-blur=\"onBlur()\" ng-required=\"!modelArr.length && isRequired\"\n                    ng-change=\"onChange()\">\n        </li>\n    </ul>\n    \n    <div class=\"autocomplete-list\" ng-show=\"isFocused || isHover\" ng-mouseenter=\"onMouseEnter()\" ng-mouseleave=\"onMouseLeave()\">\n        <ul ng-if=\"objectProperty == undefined || objectProperty == \'\'\">\n            <li ng-class=\"{\'autocomplete-active\' : selectedItemIndex == $index}\"\n                ng-repeat=\"suggestion in suggestionsArr | filter : inputValue | filter : alreadyAddedValues\"\n                ng-click=\"onSuggestedItemsClick(suggestion)\" ng-mouseenter=\"mouseEnterOnItem($index)\">\n                {{suggestion}}\n            </li>\n        </ul>\n        <ul ng-if=\"objectProperty != undefined && objectProperty != \'\'\">\n            <li ng-class=\"{\'autocomplete-active\' : selectedItemIndex == $index}\"\n                ng-repeat=\"suggestion in suggestionsArr | filter : inputValue | filter : alreadyAddedValues\"\n                ng-click=\"onSuggestedItemsClick(suggestion)\" ng-mouseenter=\"mouseEnterOnItem($index)\">\n                {{suggestion[objectProperty]}}\n            </li>\n        </ul>\n    </div>\n\n</div>\n");}]);