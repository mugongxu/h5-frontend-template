export default {
  data() {
    return {
      currentLink: '',
      timer: null
    };
  },
  created() {
    this.currentLink = this.$route.path;
  },
  mounted() {
    document.addEventListener('scroll', this.onScroll, true);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('scroll', this.onScroll, true);
    });
  },
  methods: {
    onScroll() {
      clearTimeout(this.timer);
      if (this.$route.path !== this.currentLink) return;
      this.timer = setTimeout(() => {
        let $app = document.getElementById('app');
        let clientHeight = $app.clientHeight;
        let scrollTop = $app.scrollTop;
        let scrollHeight = $app.scrollHeight;
        // 滚动条到底部的条件
        if (scrollTop + clientHeight === scrollHeight && scrollTop && this.page < this.totalPages) {
          this.page && this.page++;
          this.getDataList && this.getDataList(true);
        }
      }, 500);
    }
  }
};