/**
 * Created by HYFY on 14/12/15.
 */
angular.module('Test').
    controller('homeController', function($scope, activityProvider){
        $scope.videos = activityProvider.activities;
        activityProvider.currentActivity = activityProvider.activities[0];
        $scope.$on('ready', function(){
            $scope.currentActivity = activityProvider.currentActivity;
            $scope.$broadcast('parsea', activityProvider.currentActivity['type']);
        });
        $scope.playVideo = function(index){
            activityProvider.currentActivity = activityProvider.activities[index];
            $scope.currentActivity = activityProvider.currentActivity;
            $scope.$broadcast('parsea', activityProvider.currentActivity['type']);
        }
    });