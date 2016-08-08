# angularMultipleSelect
A complete Angularjs directive for multiple select autocomplete

#Sample View
https://cloud.githubusercontent.com/assets/13271120/11739891/b2d3e426-a014-11e5-9b57-a0d758f07bf0.png

#Example
http://run.plnkr.co/plunks/XbHaZSiYqEzxjk6TuWyj/

#Event listeners
1. beforeSelectItem : Listen for event before adding an item

```javascript
$scope.beforeSelectItem = function(item){
    // perform operation on this item before selecting it.
}
```
```html
<multiple-autocomplete ng-model="selectedList"
     before-select-item="beforeSelectItem"
     suggestions-arr="optionsList">
</multiple-autocomplete>
```

2. afterSelectItem : Listen for event before adding an item
```javascript
$scope.afterSelectItem = function(item){
    // perform operation on this item after selecting it.
}
```
```html
<multiple-autocomplete ng-model="selectedList"
     after-select-item="afterSelectItem"
     suggestions-arr="optionsList">
</multiple-autocomplete>
```

3. beforeRemoveItem : Listen for event before adding an item

```javascript
$scope.beforeRemoveItem = function(item){
    // perform operation on this item before removing it.
}
```
```html
<multiple-autocomplete ng-model="selectedList"
     before-remove-item="beforeRemoveItem"
     suggestions-arr="optionsList">
</multiple-autocomplete>
```

4. afterRemoveItem : Listen for event before adding an item

```javascript
$scope.afterRemoveItem = function(item){
    // perform operation on this item after removing it.
}
```
```html
<multiple-autocomplete ng-model="selectedList"
     after-remove-item="afterRemoveItem"
     suggestions-arr="optionsList">
</multiple-autocomplete>
```



#Getting started

Install "angular-multiple-select" from bower or npm and save it in your package.json or bower.json.
For Example :

```sh
$ npm install --save angular-multiple-select;
$ bower install --savev angular-multiple-select
```

After installation include its 
```html
multiple-select.min.css AND
multiple-select.min.js
<script src="/bower_components/angular-multiple-select/build/multiple-select.min.js"></script>
<link href="/bower_components/angular-multiple-select/build/multiple-select.min.css" rel="stylesheet">
```
in your html. Then,

Include `multipleSelect` module in your app:
For example :

```javascript
angular.module('yourModuleName', [
    'multipleSelect'
]);
```
Now angularMultipleSelect module is injected in your module. You are ready to use it.

You can use it in 2 ways in your form :
1. If your options list is an array of objects, like :

```javascript
$scope.optionsList = [
  {id: 1,  name : "Java"},
  {id: 2,  name : "C"},
  {id: 3,  name : "C++"},
  {id: 4,  name : "AngularJs"},
  {id: 5,  name : "JavaScript"}
];
```
```html
<multiple-autocomplete ng-model="selectedList"
     object-property="name"
     suggestions-arr="optionsList">
</multiple-autocomplete>
```
Here, in "suggestions-arr" you have to provide the options list from which user can select multiple value.
and, "object-property" is which you want to show to user. In above example "name" is the property which i want to show.

"ng-model" will give you an array of selected things.
For Ex : If user selects Java & C++, then
```javascript
ng-model will have
selectedList = [
      {id: 1,  name : "Java"},
      {id: 3,  name : "C++"}
  ]
```
2. If your options list is an array of strings, like :

```javascript
$scope.optionsList = [
  "Java",
  "C",
  "C++",
  "AngularJs",
  "JavaScript"
];
```
```html
<multiple-autocomplete ng-model="selectedList"
     suggestions-arr="optionsList">
</multiple-autocomplete>
```
Here, in "suggestions-arr" you have to provide the options list from which user can select multiple value.

"ng-model" will give you an array of selected things.
For Ex : If user selects Java & C++, then
```javascript
ng-model will have
selectedList = [
      "Java",
      "C++"
  ]
```

3. To make it required Field in a form

```html
<form name="multipleSelectForm" novalidate>
    <div ng-class="{'has-error' : multipleSelectForm.multipleSelect.$invalid && multipleSelectForm.multipleSelect.$dirty, 'has-success' : !multipleSelectForm.multipleSelect.$invalid && multipleSelectForm.multipleSelect.$dirty}">
        <label>3. Making it Required field in a Form</label>
        <multiple-autocomplete ng-model="skills2" name="multipleSelect" required="true"
                               suggestions-arr="skillsList1">
        </multiple-autocomplete>
        <span ng-show="multipleSelectForm.multipleSelect.$invalid && multipleSelectForm.multipleSelect.$dirty" class="ng-hide">
            <p class="error-msg" ng-show="multipleSelectForm.multipleSelect.$error.required">Please select something from multiple select field</p>
        </span>
    </div>
    <br/>
    <button type="button" class="btn btn-default" ng-click="onSubmit()">Submit Form</button>
</form>
```

4. Fetching options list from 3rd party api/url
    Part 1. If your Api return an array of strings like :
```javascript
    [
      "Java",
      "C",
      "C++",
      "AngularJs",
      "JavaScript"
    ]
```
    Then in html no need to specify property in "object-property" attribute in directive
```html
    <multiple-autocomplete ng-model="skillsFromApi"
                           api-url="{{apiPath}}"
                           suggestions-arr="">
    </multiple-autocomplete>
```

    Part 2. If your Api return an array of objects like :
```javascript
    [
      {id: 1,  name : "Java"},
      {id: 2,  name : "C"},
      {id: 3,  name : "C++"},
      {id: 4,  name : "AngularJs"},
      {id: 5,  name : "JavaScript"}
    ]
```
    Then in html you need to specify property in "object-property" attribute in directive
    Here in this case, you have to do like this :
```html
    <multiple-autocomplete ng-model="skillsFromApi"
                            object-property="name"
                           api-url="{{apiPath}}"
                           suggestions-arr="">
    </multiple-autocomplete>
```

For any suggestions, issues, Query, etc. Please feel free to let me know. Thanks :)


# The MIT License (MIT)

  Copyright (c) 2015 Jagdeep Singh

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.