<template>
  <div>
    <video id="player"></video>
  </div>
</template>

<script>
import capture from "../../static/js/tool/capture";
import playerOBJ from "../../static/js/tool/playerModule";
export default {
  name: 'HelloWorld',
  data () {
    return {
      // myPlayer:null
    }
  }
  ,mounted() {
     playerOBJ.init("player","application/","","",true);
     var myPlayer = playerOBJ.player;
     capture.initCapture(myPlayer);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
