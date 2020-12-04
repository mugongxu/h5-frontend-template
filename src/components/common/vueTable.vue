<style lang="scss" scoped>
.jfz-table-wrapper {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  font-size: rem(14);
  .jfz-table-header-wrapper,
  .jfz-table-body-wrapper,
  .jfz-table-footer-wrapper {
    width: 100%;
    overflow: hidden;
  }
  .jfz-table-header-wrapper,
  .jfz-table-fixed-header-wrapper {
    background: $primary-color;
    color: #ffffff;
  }
  .jfz-table-body-wrapper {
    overflow: auto;
    .jfz-table-empty-block {
      text-align: center;
      padding: rem(12) rem(10);
      .el-table-empty-text {
        color: $text-weak;
      }
    }
  }
  .jfz-table-footer-wrapper,
  .jfz-table-fixed-footer-wrapper {
    background: #ffffff;
    td:not(:first-child) {
      .cell {
        color: $text-warning;
      }
    }
  }
  .jfz-table-header,
  .jfz-table-body,
  .jfz-table-footer {
    table-layout: fixed;
    border-collapse: separate;
  }
  .jfz-table-body {
    tr:nth-child(odd) {
      background: #F5F5F5;;
    }
    tr:nth-child(even) {
      background: #ffffff;
    }
  }
  td, th {
    padding: rem(12) 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
    border-bottom: 1px solid $info-divider;
  }
  &.jfz-table--border {
    border: 1px solid $info-divider;
    border-right: none;
    border-bottom: none;
    td, th {
      border-right: 1px solid $info-divider;
    }
    .jfz-table-footer-wrapper {
      td, th {
        border-right: none;
      }
    }
  }
  .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: rem(24);
    padding: 0 rem(10);
  }
  .jfz-table-fixed {
    position: absolute;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: hidden;
    .jfz-table-fixed-header-wrapper {
      z-index: 3;
    }
    .jfz-table-fixed-body-wrapper {
      overflow: hidden;
      z-index: 3;
    }
  }
}
</style>

<template>
  <article class="jfz-table-wrapper jfz-table--border">
    <div
      v-if="showHeader"
      class="jfz-table-header-wrapper"
      ref="headerWrapper">
      <table
        class="jfz-table-header"
        :style="{'width': width}">
        <thead>
          <tr>
            <th
              v-for="(item, index) in props"
              :key="index"
              class="jfz-table-column"
              :colspan="item.span || 1">
              <div class="cell">{{ item.label | defaultVal }}</div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div
      class="jfz-table-body-wrapper"
      ref="bodyWrapper"
      :style="{'max-height': maxheight}">
      <table
        class="jfz-table-body"
        :style="{'width': width}">
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
            class="jfz-table-row">
            <td
              v-for="(item, colIndex) in props"
              :key="colIndex"
              :ref="'col_' + rowIndex + '_' + colIndex"
              class="jfz-table-column"
              :colspan="item.span || 1">
              <div class="cell">{{ row[item.prop] | formatNumber | defaultVal }}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="!data || data.length === 0"
        class="jfz-table-empty-block"
        ref="emptyBlock">
        <span class="el-table-empty-text">
          <slot name="empty">{{ emptyText }}</slot>
        </span>
      </div>
    </div>
    <div
       v-if="showFooter"
       class="jfz-table-footer-wrapper"
       ref="footerWrapper">
       <table
        class="jfz-table-footer"
        :style="{'width': width}">
        <tbody>
          <tr class="jfz-table-row">
            <td
              v-for="(item, index) in props"
              :key="index"
              class="jfz-table-column"
              :colspan="item.span || 1">
              <div class="cell">{{ total[item.totalProp] | formatNumber | defaultVal }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="!!fixedCount"
      class="jfz-table-fixed"
      :style="{'width': fixedWidth + 'px'}">
      <div
        v-if="showHeader"
        class="jfz-table-fixed-header-wrapper"
        ref="fixedHeaderWrapper">
        <table
          class="jfz-table-header"
          :style="{'width': width}">
          <thead>
            <tr>
              <th
                v-for="(item, index) in props"
                :key="index"
                class="jfz-table-column"
                :colspan="item.span || 1">
                <div class="cell">{{ item.label | defaultVal }}</div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div
        class="jfz-table-fixed-body-wrapper"
        ref="fixedBodyWrapper"
        :style="{'max-height': maxheight}">
        <table
          class="jfz-table-body"
          :style="{'width': width}">
          <tbody>
            <tr
              v-for="(row, rowIndex) in data"
              :key="rowIndex"
              class="jfz-table-row">
              <td
                v-for="(item, colIndex) in props"
                :key="colIndex"
                class="jfz-table-column"
                :colspan="item.span || 1">
                <div class="cell">{{ row[item.prop] | formatNumber | defaultVal }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
         v-if="showFooter"
         class="jfz-table-fixed-footer-wrapper"
         ref="fixedFooterWrapper">
         <table
          class="jfz-table-footer"
          :style="{'width': width}">
          <tbody>
            <tr class="jfz-table-row">
              <td
                v-for="(item, index) in props"
                :key="index"
                class="jfz-table-column"
                :colspan="item.span || 1">
                <div class="cell">{{ total[item.totalProp] | formatNumber | defaultVal }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    /**
     * [{
     *   label: 表头名,
     *   prop: 属性名,
     *   span: 占位,
     *   fixed: false,
     *   totalProp: 汇总
     * }]
     */
    props: {
      type: Array,
      default: () => []
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    maxheight: {
      type: [String, Number],
      default: 'auto'
    },
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    total: {
      type: Object,
      default: () => {}
    },
    border: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    emptyText: {
      type: [String, Number],
      default: '暂无数据'
    }
  },
  computed: {
    bodyWrapper() {
      return this.$refs.bodyWrapper;
    }
  },
  data() {
    return {
      fixedCount: 0,
      fixedWidth: 0
    };
  },
  created() {
    let fixedCount = 0;
    let props = (this.props || []);
    for (let i = 0, len = props.length; i < len; i++) {
      if (props[i].fixed) {
        fixedCount++;
      } else {
        break;
      }
    }
    this.fixedCount = fixedCount;
  },
  mounted() {
    this.bindEvents();
    window.addEventListener('resize', this.resize, false);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.resize, false);
    });
    if (this.data && this.data.length) {
      this.resize();
    }
  },
  updated() {
    this.resize();
  },
  methods: {
    bindEvents() {
      const { headerWrapper, footerWrapper } = this.$refs;
      const refs = this.$refs;
      let self = this;

      this.bodyWrapper.addEventListener('scroll', function() {
        if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
        if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
        if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop;
        if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
        const maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
        const scrollLeft = this.scrollLeft;
        if (scrollLeft >= maxScrollLeftPosition) {
          self.scrollPosition = 'right';
        } else if (scrollLeft === 0) {
          self.scrollPosition = 'left';
        } else {
          self.scrollPosition = 'middle';
        }
      });
    },
    resize() {
      try {
        let width = 0;
        for (let i = 0; i < this.fixedCount; i++) {
          width += this.$refs[`col_0_${i}`][0].clientWidth + 1;
        }
        this.fixedWidth = width + 1;
      } catch (e) {}
    }
  }
};
</script>
