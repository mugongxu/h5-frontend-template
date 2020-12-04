<template>
  <div id="app" :class="{'fixed-app': fixedStatus}">
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixedStatus: false
    };
  },
  created() {
    this.resize();
    window.addEventListener('resize', this.resize, false);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize, false);
  },
  methods: {
    resize() {
      if(/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) { // 移动端
        // 移动端操作
        this.fixedStatus = false;
      } else {
        // pc端操作
        // 固定app宽度
        this.fixedStatus = true;
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  height: 100%;
  overflow: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: .14rem;
}
.fixed-app {
  max-width: 750px;
  min-width: 320px;
  margin: 0 auto;
  box-sizing: border-box;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Microsoft Yahei",sans-serif;
  overflow: hidden;
}
</style>
