/**
 * Created by HYFY on 14/12/15.
 */
angular.module('Test').
    factory('activityProvider', function(){
        var currentActivity = {};
        var activities = [];
        var history = {};
        var videos = [];
        var problems = [];
        return {
            currentActivity: currentActivity,
            activities: activities,
            history: history,
            videos: videos
        };
    }).
    factory('activity', function($q, $http, activityProvider){
        var getActivity = function(){
            var defer = $q.defer();
            var promise = defer.promise;
            $http({
                method: 'GET',
                url: 'activity.json'
            }).success(function(data){
                activityProvider.activities = data;
                defer.resolve(data);
            }).error(function(err){defer.reject(err);});
            return promise;
        };
        return {
            getActivity: getActivity
        };
    }).
    factory('problem', function($q, $http, activityProvider, $rootScope){
        $rootScope.$on('beginGiveProblem', function(){

        });
        var problems = activityProvider.currentActivity['problems'];
        var nextProblem = function(){
        }
    })