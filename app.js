/**
 * Created by HYFY on 14/12/15.
 */
angular.module('Test', ['ngRoute', 'ui.bootstrap'])
    .config(function videoConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'homeController',
                resolve: {
                    activity: ['activity', function(activity) {
                        return activity.getActivity();
                    }]
                }
            })
    })

    .run(function videoRun() {
        //console.log('video runing...');
    })

;
