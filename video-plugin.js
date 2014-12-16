;
(function(win, vjs, undefined) {

    vjs.plugin('rewind', function(options) {
        var that = this;
        //rewind
        var btnRewind = that.controlBar.addChild('button');
        btnRewind.addClass('vjs-rewind-button');
        btnRewind.on('click', function() {
            var BACK_TIME = options.time || 10;
            var RewindTime = Math.max(that.currentTime() - BACK_TIME, 0);
            that.currentTime(RewindTime);
        });
    });
    //turn off light
    vjs.plugin('light', function(callback) {
        var that = this;
        var btnTurnOffLight = that.controlBar.addChild('button');
        btnTurnOffLight.addClass('vjs-light-button');
        btnTurnOffLight.on('click', callback);
    });

    vjs.plugin('fixControlsBar', function(enable) {
        if (enable) {
            //某种极端条件下 , videojs 的 vjs-has-started 没有设置 ?
            this.on('play', function() {
                this.addClass('vjs-has-started');
            });
        }
    });

    vjs.plugin('choices', function(options) {
        var that = this;
        var playerElement = that.el();

        //choices
        if (typeof options == 'object') {

            vjs.ChoicesControl = $('<div />');
            vjs.ChoicesControl.addClass('vjs-choices-control');
            //refactor the loop and reset the choice id
            _.each(options, function(value, key) {
                var choicesOption = $('<div />');
                var choicesOptionID = key;
                choicesOption.addClass('vjs-choices-option');
                choicesOption.text(value.choice.body);
                choicesOption.attr('id', choicesOptionID);
                choicesOption.on('click', value.fn);
                vjs.ChoicesControl.append(choicesOption);
            });

            $(playerElement).append(vjs.ChoicesControl);

        } else if (options === false) {
            vjs.ChoicesControl && vjs.ChoicesControl.remove();
        }

    });

    vjs.plugin('mobile', function(options) {
        var that = this;
        var ua = navigator.userAgent.toLowerCase();
        if (/ipad|iphone/.test(ua)) {
            this.on('click', function() {
                that.play();
                that.off('click');
            });
        }
    });

    vjs.plugin('forbidContextMenu',function(options){
        this.on('contextmenu',function(e){
            e.preventDefault();
            return false;
        })
    });

    vjs.plugin('register', function (enabled) {
        if (enabled) {
            var that = this;
            var playerElement = that.el();

            vjs.registerBtn = $('<div />');
            var button = $('<a class="btn btn-lg btn-warning">立即免费使用</a>');
            vjs.registerBtn.append(button);

            var change = function (ifEnd) {
                vjs.registerBtn.toggleClass('vjs-register-center', ifEnd);
                vjs.registerBtn.toggleClass('vjs-register-floating', !ifEnd);
            }
            change(false);

            vjs.registerBtn.click(function () {
                // /webapp/login/?r=o#/ webapp/login/#/
                var regex = new RegExp('.*/webapp/.*/([^/]*)#/');
                var qs = location.href.match(regex);
                var qsArray = {};
                location.href.replace(
                    new RegExp("([^?=&]+)(=([^&#/]*))?", "g"),
                    function ($0, $1, $2, $3) {
                        qsArray[$1] = $3;
                    }
                );

                // 强制刷新去掉video播放带来的modal效果
                $('.modal-backdrop').remove();

//                var targetPath = qsArray['r'] == 'o' ? '#/signup' : '#/newSignup';
                var targetPath = '#/user/role';
                var targetQS = qs.length > 1 ? qs[1] : '';
                if(targetPath === '#/user/role') Track.user.softRegist('video');
                location.href = '/webapp/login/' + targetQS + targetPath;

            });


            that.on('ended', function () {
                change(this.currentTime() == this.duration());
            });

            that.on('pause', function () {
                change(this.currentTime() == this.duration());
            });

            that.on('play', function () {
                change(this.currentTime() == this.duration());
            });

            $(playerElement).append(vjs.registerBtn);
        }
    });

})(window, videojs);