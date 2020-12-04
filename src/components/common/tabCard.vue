<style lang="scss" scoped>
.tab-card-wrapper {
  text-align: center;
  .tab-card-container {
    display: inline-block;
    .tab-card-items {
      display: flex;
    }
    .tab-card-item {
      flex: 1;
      padding: rem(2);
      border: 1px solid $info-divider;
      cursor: pointer;
      &:not(:first-child) {
        border-left: none;
      }
      &:first-child {
        border-radius: rem(5) 0 0 rem(5);
      }
      &:last-child {
        border-radius: 0 rem(5) rem(5) 0;
      }
      &.active {
        border-color: $text-highlight;
        border-left: 1px solid $text-highlight;
        color: $text-highlight;
      }
    }
  }
}
</style>
<template>
  <div class="tab-card-wrapper">
    <div
      class="tab-card-container"
      :style="{ width: typeof width === 'string' ? width : width + 'px' }">
      <ul class="tab-card-items">
        <li
          v-for="(tab, index) in tabs"
          :key="tab.key"
          class="tab-card-item font-weak font-size-14"
          :class="{ 'active': activeIndex === index }"
          @click="change(index)">
          {{ tab.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: '100%'
    },
    /**
     * {key: 唯一键值, title: 中文名}
     */
    tabs: {
      type: Array,
      defalut: [],
      required: true
    },
    defaultActiveIndex: {
      type: Number,
      default: 0
    },
    trigger: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIndex: 0,
      activeIndexCache: null
    };
  },
  watch: {
    defaultActiveIndex() {
      this.activeIndex = this.defaultActiveIndex || 0;
    }
  },
  created() {
    this.activeIndex = this.defaultActiveIndex || 0;
    this.init();
  },
  methods: {
    init() {
      if (this.trigger) {
        this.activeIndexCache = this.activeIndex;
        this.$emit('change', {
          tab: this.tabs[this.activeIndex],
          index: this.activeIndex
        });
      }
    },
    change(index) {
      this.activeIndex = index;
      if (this.activeIndexCache === this.activeIndex) return;
      this.activeIndexCache = this.activeIndex;
      this.$emit('change', {
        tab: this.tabs[this.activeIndex],
        index: this.activeIndex
      });
    }
  }
};
</script>
