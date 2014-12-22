/**
 * Created by HYFY on 14/12/15.
 */
angular.module('Test')
    //.directive("hypervideo", ["$compile", "$timeout", "$rootScope", "activityProvider", "$sce",
    //    function($compile, $timeout, $rootScope, activityProvider, $sce) {
    //        return {
    //            restrict: "E",
    //            templateUrl: '_videoTemplate.html',
    //            link: function($scope, $element, $attrs) {
    //                //$scope.showVideoRating = false;
    //                $scope.currentActivity = activityProvider.currentActivity;
    //                $scope.video = activityProvider.currentActivity.videos[0];
    //                $scope.problemMaterial = $scope.video['problems'];
    //                $scope.isMainVideo = true;
    //                $scope.mainUrl = $sce.trustAsResourceUrl($scope.video.url);
    //                var videoTag = $element.find('video').get(0);
    //                var options = {};
    //                options["controls"] = true;
    //                options["preload"] = "auto";
    //                options.plugins = {
    //                    //init [ rollBack ] plugin, default is 10s .
    //                    rewind: {
    //                        time: 10
    //                    },
    //                    //init [ interaction ] plugin, default is false .
    //                    choices: false,
    //                    //init [ mobile ] plugin
    //                    mobile: true,
    //                    fixControlsBar: true,
    //                    //init [ TurnOffLights ] 插件 .
    //                    //light: function() {
    //                    //   $(document.body).toggleClass('turn-off-light');
    //                    //}
    //                    //禁掉视频右键菜单，防止下载
    //                    forbidContextMenu: true
    //
    //                }
    //
    //                var ua = navigator.userAgent.toLowerCase();
    //                if (!(/ipad|iphone|android/.test(ua))) {
    //                    options["autoplay"] = true;
    //                }
    //
    //                //init main video js
    //                var mainPlayer = videojs(videoTag, options);
    //                //TODO: init the main url
    //                mainPlayer.src($scope.video.url);
    //                var mainVideojsElement = mainPlayer.el();
    //                var mainVideoElement = $('video', mainVideojsElement).get(0);
    //                //init Popcorn
    //                var popcorn = Popcorn(mainVideoElement);
    //                //init sub video js
    //                var subPlayer = videojs("subVideo", options);
    //                var subVideojsElement = subPlayer.el();
    //                var subVideoElement = $('video', subVideojsElement).get(0);
    //
    //                //保存所有子视频所设置的跳转回主视频的时间点：<key:video.url>:<value:jump_time>
    //                var videos_time = {};
    //                //记录上次主视频播放到的时间
    //                var mainVideoLastTime = 0;
    //                //为mixpanel设置的帮助计算用户回答交互题目所需要时间的DS
    //                var problemStartTimes = {};
    //                //控制主视频跳转时间的全局变量
    //                var jump_time = undefined;
    //
    //                /**
    //                 * [playSubVideo description:play the subVideo]
    //                 * @param  {[type]} url [description: the subVideo.url]
    //                 * @return {[type]}     [description: no]
    //                 */
    //                var playSubVideo = function(url) {
    //                    $scope.isMainVideo = false;
    //                    mainVideoLastTime = popcorn.currentTime();
    //                    //$(videoElement).attr('src', url);
    //                    mainPlayer.pause();
    //                    subPlayer.src(url);
    //                    $scope.$digest();
    //                };
    //
    //                /**
    //                 * [jumpTo description: 由videojs控制“当前主视频”跳转到“当前主视频”的某一时间点，jump_time有可能为空，那么就默认此时的mainVideoLastTime播放]
    //                 * @param  {[type]} time [需要跳转的时间点]
    //                 * @return {[type]}      [NO]
    //                 */
    //                var jumpTo = function(time) {
    //                    if (time && (typeof time == 'number')) {
    //                        mainPlayer.currentTime(time);
    //                    } else {
    //                        mainPlayer.currentTime(mainVideoLastTime + 1);
    //                    }
    //                    mainPlayer.play();
    //                };
    //
    //                /**
    //                 * [makeChoices 做出选择：1.如果有相关视频，那么播放相关视频如果有跳转时间则会在相关视频中定义  2.可能虽然没有相关视频，但是有设置跳转时间]
    //                 * @param  {[type]} material [the hyperProblem object]
    //                 * @param  {[type]} choice   [the made choice]
    //                 * @return {[type]}          [NO]
    //                 */
    //                var makeChoices = function(material, choice) {
    //                    //==============mixpanel==================
    //                    //Track.learner.answerVideoProblem(material, (new Date().getTime() - problemStartTimes[material.show_time]) / 1000, choice.is_correct, choice.body);
    //                    //========================================
    //                    var correct_video = material.correct_video;
    //                    var wrong_video = material.wrong_video;
    //                    if (correct_video && choice.is_correct) {
    //                        if (correct_video.url) {
    //                            if (correct_video.jump) {
    //                                videos_time[correct_video.url] = correct_video.jump;
    //                            }
    //                            playSubVideo(correct_video.url);
    //                        } else {
    //                            jumpTo(correct_video.jump);
    //                        }
    //                    } else if (wrong_video && !choice.is_correct) {
    //                        if (wrong_video.url) {
    //                            if (wrong_video.jump) {
    //                                videos_time[wrong_video.url] = wrong_video.jump;
    //                            }
    //                            playSubVideo(wrong_video.url);
    //                        } else {
    //                            jumpTo(wrong_video.jump);
    //                        }
    //                    } else {
    //                        mainPlayer.play();
    //                    }
    //                };
    //
    //                var getFn = function(material, choice) {
    //                    return function() {
    //                        mainPlayer.choices(false);
    //                        mainPlayer.controls(true);
    //                        makeChoices(material, choice);
    //                    }
    //                };
    //
    //                _.each($scope.problemMaterial, function(material, index) {
    //                    popcorn.cue(material.show_time, function() {
    //                        if (!$scope.isMainVideo) return;
    //                        //==============mixpanel===================
    //                        problemStartTimes[material.show_time] = new Date().getTime();
    //                        //Track.learner.startVideoProblem(material);
    //                        //=========================================
    //                        mainPlayer.pause();
    //                        mainPlayer.controls(false);
    //                        //options : {choice_id_one: {choice: choine_one, fn: fn}, choice_id_two: {choice: choice_two, fn: fn}}
    //                        var options = {};
    //                        _.each(material.choices, function(choice) {
    //                            options[choice._id] = {
    //                                choice: choice,
    //                                fn: getFn(material, choice)
    //                            }
    //                        });
    //                        mainPlayer.choices(options);
    //                        //mathjax support .
    //                        $('.vjs-choices-control div').each(function(i, item) {
    //                            //MathJax.Hub.Queue(["Typeset", MathJax.Hub, item]);
    //                        });
    //
    //                    })
    //                })
    //
    //                mainPlayer.on('progress', function() {
    //                    if (mainPlayer.duration()) {
    //                        var halfOfVideo = mainPlayer.duration() / 2;
    //                        var limitOfVideo = mainPlayer.duration() / 3 * 2;
    //                        if ((mainPlayer.currentTime() >= halfOfVideo) && ($scope.currentActivity.type == 'video')) {
    //                            $scope.showVideoRating = true;
    //                            $scope.$digest();
    //                        }
    //                        if((mainPlayer.currentTime() >= limitOfVideo) && ($scope.currentActivity.type == 'video') && !$scope.emitted){
    //                            $scope.emitted = true;
    //                            //TempStorage.record('认真观看一个视频', '+5分');
    //                            //$scope.$emit('videoSuccess', {username:$scope.user.username,lesson_id:$scope.currentLesson._id,user_id:$scope.user._id, is_temp:$scope.user.is_temp});
    //                        }
    //                        if(parseInt(mainPlayer.currentTime()) == parseInt(mainPlayer.duration() - $scope.video.trailer)){
    //                            alert('视频观看完成');
    //                            //$rootScope.$broadcast('videojs_dispose')
    //                        }
    //                    }
    //                });
    //
    //                mainPlayer.on('loadedmetadata', function () {
    //                    // for android chromium
    //                    if (mainVideoElement.videoWidth > 0 && mainVideoElement.videoHeight > 0) {
    //                        $(mainVideojsElement)
    //                            .width(mainVideoElement.videoWidth)
    //                            .height(mainVideoElement.videoHeight);
    //                    } else {
    //                        $(mainVideojsElement).width(720).height(540);
    //                    }
    //                });
    //
    //                subPlayer.on('loadedmetadata', function() {
    //                    // for android chromium
    //                    if (subVideojsElement.videoWidth > 0 && subVideojsElement.videoHeight > 0) {
    //                        $(subVideojsElement)
    //                            .width(subVideoElement.videoWidth)
    //                            .height(subVideoElement.videoHeight);
    //                    } else {
    //                        $(subVideojsElement).width(720).height(540);
    //                    }
    //                });
    //
    //                mainPlayer.on('ended', function(){
    //                    if(activityProvider.currentActivity.problems){
    //                        $rootScope.$broadcast('videoEnd', 'problem');
    //                    }
    //                });
    //
    //                subPlayer.on('ended', function() {
    //                    var pre_child_path = subPlayer.currentSrc();
    //                    jump_time = videos_time[pre_child_path];
    //
    //                    if (jump_time) {
    //                        mainPlayer.currentTime(jump_time);
    //                        jump_time = undefined;
    //                    } else {
    //                        mainPlayer.currentTime(mainVideoLastTime + 1);
    //                    }
    //
    //                    $scope.isMainVideo = true;
    //                    $scope.$digest();
    //                    mainPlayer.play();
    //                });
    //
    //                mainPlayer.ready(function() {
    //                    if(activityProvider.history[$scope.video['url']]){
    //                        this.currentTime(activityProvider.history[$scope.video['url']]);
    //                    }
    //                    this.play();
    //                });
    //
    //                subPlayer.ready(function() {
    //                    this.play();
    //                })
    //
    //                $scope.$on('pausePlay', function() {
    //                    if ($scope.isMainVideo && !mainPlayer.paused()) {
    //                        mainPlayer.pause();
    //                    }
    //                    if (!$scope.isMainVideo && !subPlayer.paused()) {
    //                        subPlayer.pause();
    //                    }
    //                    $rootScope.$broadcast('turn-on-light');
    //                });
    //
    //                $scope.$on('continuePlay', function() {
    //                    if ($scope.isMainVideo && mainPlayer.paused()) {
    //                        mainPlayer.play();
    //                    }
    //                    if (!$scope.isMainVideo && subPlayer.paused()) {
    //                        subPlayer.play();
    //                    }
    //                });
    //
    //                $scope.$on('reset_time', function() {
    //                    if (mainPlayer.duration()) mainPlayer.currentTime(0);
    //                    if (subPlayer.duration()) subPlayer.currentTime(0);
    //                });
    //
    //                $scope.$on('videojs_dispose', function() {
    //                    if (mainPlayer) {
    //                        activityProvider.history[$scope.video.url] = mainPlayer.currentTime();
    //                        mainPlayer.dispose();
    //                        //console.log('main video dispose');
    //                    }
    //                    if (subPlayer) {
    //                        subPlayer.dispose();
    //                        //console.log('sub video dispose');
    //                    }
    //                });
    //
    //                $scope.$on('turn-on-light', function() {
    //                    $(document.body).removeClass('turn-off-light');
    //                });
    //            }
    //        }
    //    }
    //])
    .directive('hypervideo', function(){
        return {
            restrict: 'E',
            scope: {
                activity: '=activity'
            },
            controller: function($scope, $element, $attrs, activityProvider, $rootScope){
                $scope.video = $scope.activity || activityProvider.currentActivity.videos[0];
                var time = $attrs["time"] ? parseInt($attrs["time"]) : 0;
                var video = null, videoJSPlayer = null, popcorn = null;
                var timeProblem = {}, options = {}, videoHistory = [];
                options["controls"] = true;
                options["preload"] = "auto";
                options["autoplay"] = "false";
                options.plugins = {
                    rewind: {
                        time: 10
                    },
                    choices: false,
                    mobile: true,
                    fixControlsBar: true,
                    forbidContextMenu: true
                };
                var initHyperVideo = function(newVideo){
                    $element.html('<video id="video" class="video-js vjs-default-skin"></video>');
                    video = $('video')[0];
                    $scope.video = newVideo;
                    video.src = $scope.video.url;
                    popcorn = Popcorn(video);
                    initVideoJSPlayer();
                };
                var initVideoJSPlayer = function(){
                    videoJSPlayer = videojs(video, options);
                    popcorn.on("loadedmetadata", initPlayerSize);
                    popcorn.on('progress', processData);
                    popcorn.on('ended', processVideoEnded);
                    initProblem();
                };
                var initProblem = function(){
                    $scope.problems = $scope.video['problems'];
                    video.canplay = cueVideo();
                };
                $scope.$on('destroyVideoResource', function(){
                    try {
                        popcorn.destroy();
                        videoJSPlayer.dispose();
                    } catch(e){
                        //console.log(e);
                    }
                });
                var initPlayerSize = function(){
                    var videoJsEl = videoJSPlayer.el();
                    if (videoJsEl.videoWidth > 0 && videoJsEl.videoHeight > 0) {
                        $(videoJsEl).width(videoJsEl.videoWidth).height(videoJsEl.videoHeight);
                        return;
                    }
                    $(videoJsEl).width(720).height(540);
                };
                var processData = function(){

                };
                var processVideoEnded = function(){
                    var result = $scope.video.from;
                    if(result){
                        $rootScope.$broadcast('destroyVideoResource');
                        time = result['playTime'] + 1;
                        $('#area').remove();
                        initHyperVideo(result);
                    }
                };
                var createVideoNode = function(fromVideo, currentVideo, time){
                    currentVideo['from'] = fromVideo;
                    fromVideo['playTime'] = time;
                };
                var makeChoice = function(choice){
                    return function(){
                        $('#area').remove();
                        videoJSPlayer.controls(true);
                        if(choice.jumpVideo){
                            popcorn.destroy();
                            createVideoNode($scope.video, choice.jumpVideo, parseInt(video.currentTime));
                            initHyperVideo(choice.jumpVideo); return;
                        }
                        if(choice['back_time'] != undefined){
                            video.currentTime = choice['back_time']; return;
                        }
                        video.play();
                    }
                };
                var showProblem = function(time){
                    var choices = timeProblem[time]['choices'];
                    var options = {};
                    _.each(choices, function(choice) {
                        options[choice._id] = {
                            choice: choice,
                            fn: makeChoice(choice)
                        }
                    });
                    videoJSPlayer.choices(options);
                };
                var cueVideo = function(){
                    _.each($scope.problems, function(problem){
                        if(problem.show_time){
                            timeProblem[problem.show_time] = problem;
                            popcorn.cue(problem.show_time, function(){
                                video.pause();
                                videoJSPlayer.controls(false);
                                showProblem(parseInt(video.currentTime));
                            });
                        }
                    });
                    video.currentTime = time || 0;
                    video.play();
                };
                initHyperVideo($scope.video);
            }
        }
    })
    .directive('rate', function() {
        return {
            restrict: 'E',
            templateUrl: 'rating.html',
            replace: true,
            controller: ["$element", "$scope",
                function($element, $scope) {
                    var tip = ['很不喜欢', '不喜欢', '无所谓', '喜欢', '很喜欢'];
                    $scope.rate = 0;
                    $scope.max = 5;
                    $scope.isReadonly = false;
                    $scope.hoveringOver = function(value) {
                        $scope.overStar = value;
                        $scope.percent = tip[10 * ((value - 1) / $scope.max) / 2];
                        $element.onclick = function(){
                            $scope.rate = value;
                        };
                    };
                    //================mixpanel========================
                    $scope.$watch('rate', function() {
                        if ($scope.rate != 0) { // 因为视频打分从1开始，0其实是未点击状态
                            //console.log($scope.rate);
                            //Track.learner.rateVideo($scope.rate);
                        }
                    });
                    //================================================
                }
            ]
        }
    })
    .directive('problem', function(){
        return {
            restrict: "E",
            templateUrl: '_problemTemplate.html',
            scope: {},
            controller: function($scope, $element, $attrs, activityProvider){
                $scope.obj = {};
                $scope.problems = activityProvider.currentActivity['problems'];
            }
        }
    })
    .directive('activity', function(){
        return {
            restrict: 'A',
            controller: function($scope, $element, $rootScope, $compile){
                $scope.$on('hypervideo', function(){
                    $rootScope.$broadcast('destroyVideoResource');
                    $element.html('<hypervideo></hypervideo>');
                    $compile($element.children())($scope);
                });
                $scope.$on('videoEnd', function(){
                    $rootScope.$broadcast('destroyVideoResource');
                    $element.html('<problem></problem>');
                    $compile($element.children())($scope);
                });
            }
        }
    });

