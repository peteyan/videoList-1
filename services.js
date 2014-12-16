/**
 * Created by HYFY on 14/12/15.
 */
angular.module('Test').
    factory('activityProvider', function(){
        var currentActivity = {};
        var activities = [];
        var history = {};
        return {
            currentActivity: currentActivity,
            activities: activities,
            history: history
        };
    }).
    factory('activity', function($q, $http, activityProvider){
        var getActivity = function(){
            var defer = $q.defer();
            var promise = defer.promise;
            $http({
                method: 'GET',
                url: 'videoMOck.json'
            }).success(function(data){
                activityProvider.currentActivity = data[0];
                activityProvider.activities = data;
                defer.resolve(data);
            }).error(function(err){defer.reject(err);});
            return promise;
        };
        return {
            getActivity: getActivity
        };
    });