//VTC播放器
/**
 * videoJS v-6.6.0封装
 * player.on("fullscreenchange",handleFunction)  监听全屏变化
 * player.poster(poster) 设置视频封面
 * player.controls(bool) 控制条显示隐藏
 * player.isFullscreen() 获取全屏状态
 * player.duration()  获取视频总时长
 * player.currentTime(seconds) 设置当前播放时间
 * player.requestFullscreen() 全屏
 * player.exitFullscreen() 退出全屏
 * **/
var playerOBJ;
export default playerOBJ = {
    player: null
    //    初始化播放器:video的id 视频类型type 视频源src
    , init: function (id, type, src, poster,isPlayBtn) {
        var that = this;
        this.player = videojs(id, {
            controls:true
            ,bigPlayButton: isPlayBtn?isPlayBtn:false
            , textTrackDisplay: false
            , posterImage: true   //视频封面
            , errorDisplay: false
            , html5: {
                hls: {
                    withCredentials: false
                }
            }
            , flash: {
                hls: {
                    withCredentials: false
                }
            }
        }, function () {
            var _this = this;
            //为播放器设置视频类型type 视频源src
            this.src({type: type, src: src});

            //设置视频封面
            if (poster) {
                this.poster(poster)
            }
            //播放器准备完成
            videojs.log('player is on ready!');

            //pc端设置自动播放 (ps:移动端不兼容)
            if(that.isPC()){
                this.play();
            }

            //开始加载
            this.on('loadstart', function () {
                videojs.log('loading...')
            });

            //加载完成
            this.on('loadedmetadata', function () {
                videojs.log('loaded');
            });

            //卡顿
            this.on('waiting', function () {
                videojs.log('waiting...');
                //解决缓冲进度显示异常bug
                if (document.querySelector(".vjs-loading-spinner") !== null) {
                    document.querySelector(".vjs-loading-spinner").style.display = "block";
                }
            });

            //正在接收视频流
            this.on('seeking', function () {
                videojs.log('seeking');
                //解决缓冲进度显示异常bug
                // if (document.querySelector(".vjs-loading-spinner") !== null) {
                //     document.querySelector(".vjs-loading-spinner").style.display = "block";
                // }
            });

            //拿到视频流，可以播放
            this.on('seeked', function () {
                videojs.log('seeked');
                //解决缓冲进度显示异常bug
                if (document.querySelector(".vjs-loading-spinner") !== null) {
                    document.querySelector(".vjs-loading-spinner").style.display = "none";
                }
            });

            //可以播放
            this.on('canplay', function () {
                //解决缓冲进度显示异常bug
                if (document.querySelector(".vjs-loading-spinner") !== null) {
                    document.querySelector(".vjs-loading-spinner").style.display = "none";
                }
            });

            //视频播放结束
            this.on('ended', function () {
                videojs.log('视频播放结束');
            });

            //网络失速
            this.on("stalled", function () {
                videojs.log("网络失速");
            });

            //延迟下载
            this.on("suspend", function () {
                videojs.log("延迟下载");
            });

            //加载失败 向后3s播放
            this.on('error', function () {
                videojs.log("error! reload...");
                var _this = this;
                setTimeout(function () {
                    _this.src({type: type, src: _this.src()});
                    _this.load();
                    _this.play();
                    _this.currentTime(_this.currentTime() + 3);
                }, 500);
            });

            //播放中止
            this.on('abort', function () {
                videojs.log('加载失败，播放中止!');
            });
        });
    }
    //    切换视频源自动播放
    , switchSrc: function (type, src, poster) {
        if (poster) {
            this.player.poster(poster);
        }
        this.player.src({type: type, src: src});
        this.player.play();
    }
    //判断是否为直播 （视频播放后调用有效）
    ,isLive:function () {
        return this.player.duration() === Infinity;
    }
    //判断设备PC/移动
    , isPC: function () {
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        for (var v = 0; v < Agents.length; v++) {
            if (navigator.userAgent.indexOf(Agents[v]) > 0) {
                return false;
            }
        }
        return true;
    }
};
