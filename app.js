var app = angular.module('UiGridDatepicker', [
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.cellNav',
    'ui.grid.moveColumns'
]);

app.controller('MainCtrl', ['$scope','$http', function ($scope,$http) {
    $scope.msg = {};
    $scope.data = [];

    $scope.gridOptions = {
        enableCellEdit: false, // set all columns to non-editable unless otherwise specified; cellEditableCondition won't override that

    enableCellEditOnFocus: true, // set any editable column to allow edit on focus

    cellEditableCondition: function($scope) {

      // put your enable-edit code here, using values from $scope.row.entity and/or $scope.col.colDef as you desire
      return $scope.row.entity.isActive; // in this example, we'll only allow active rows to be edited

    }
    };

     $scope.gridOptions.columnDefs = [

    {name: 'isActive', displayName: 'Edit Status', enableColumnMenu: false, cellTemplate: 'cellTemplate_lock.html'}, // displays isActive status as a button and allow toggling it 

    {name: 'name', enableCellEdit: true}, // editing is enabled for this column, but will be overridden per row by cellEditableCondition

    {name: 'company', enableCellEdit: true}, // same for this column
    { name: 'Date',enableCellEdit: true,
                field: 'registered',
                cellFilter: 'textDate:"M/d/yyyy"',
                editableCellTemplate: '<div><form name="inputForm"><div ui-grid-edit-datepicker ng-class="\'colt\' + col.uid"></div></form></div>'
    }

  ];

 $scope.gridOptions.onRegisterApi = function(gridApi) {

    $scope.gridApi = gridApi;

    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {

      $scope.msg.lastCellEdited = 'ID: ' + rowEntity.id + ', Column: ' + colDef.name + ', New Value: ' + newValue + ', Old Value: ' + oldValue;

      $scope.$apply();

    });

  };
    
  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json').success(function(data) {

    $scope.gridOptions.data = data;
    console.log(data);

  });
}]);