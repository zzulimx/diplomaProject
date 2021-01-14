/*
  *title:当前文件名，报错提示
  * player:初始化屏幕捕获显示播放器
  * handleSuccess:屏幕捕获成功后回调
  * handleError:屏幕捕获失败后回调
 */
var capture;
export default capture = {
  title: "capture.js:",
  player: null,
  initCapture: function (player) {
    if (player == null || undefined) {
      throw new Error(this.title + "播放器无效!");
      return;
    }
    this.player = player;
    try {
      var promiseCapture = null;
      var constrants = {
        video: true,
        audio: true
      };
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        promiseCapture = navigator.mediaDevices.getDisplayMedia(constrants);
      } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        promiseCapture = navigator.mediaDevices.getUserMedia(constrants);
      } else {
        throw new Error(this.title + "当前环境不支持屏幕捕获！")
      }
    } catch (e) {
      alert(e.message);
    } finally {
      if (promiseCapture) {
        promiseCapture.then(this.handleSuccess)
          .catch(this.handleError)
      }
    }
  }
  , handleSuccess: function (stream) {
    this.player.src(stream);
    console.log(myPlayer.src());
  }
  , handleError: function () {
    throw new Error(this.title + "屏幕捕获失败！");
  }
};
