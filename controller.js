/**
 * Created by HYFY on 14/12/15.
 */
angular.module('Test').
    controller('homeController', function($scope, activityProvider){
        $scope.playVideo = function(index){
            activityProvider.currentActivity = activityProvider.activities[index];
            $scope.currentActivity = activityProvider.currentActivity;
            $scope.$broadcast('hypervideo');
        };
        var processData = function(){
            $scope.activities = activityProvider.activities;
            activityProvider.currentActivity = $scope.activities[0];
        };

        processData();
    });