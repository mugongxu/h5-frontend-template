<style lang="scss" scoped>
.stripe-table-wrapper {
  overflow: auto;
  .stripe-table {
    position: relative;
    .tbody-contain {
      position: relative;
      overflow: hidden;
      overflow-y: auto;
    }
    .flex-box {
      display: flex;
      display: -webkit-flex;
      flex-wrap: nowrap;
      align-items: stretch;
      width: 100%;
      font-size: rem(14);
      color: $text-primary;
      border-bottom: 1px solid $info-divider;
      span {
        display: block;
        flex: 1;
        -webkit-box-flex: 1;
        min-height: rem(40);
        font-size: rem(14);
        text-align: center;
        color: $text-default;
        padding: rem(10) 0;
        z-index: 3;
      }
      span:last-child {
        border-right: none!important;
      }
      span.no-data {
        text-align: center;
      }
      @for $i from 1 through 10 {
        .level-#{$i} {
          -webkit-flex: $i;
          flex: $i;
        }
      }
    }
    .thead {
      background: #F5F5F5;
      span {
        color: $text-primary;
      }
    }
    .tbody {
      span:last-child {
        color: $text-default;
      }
      &.total {
        background: #ffffff!important;
        border-top: 1px solid $info-divider;
        span:not(:first-child) {
          color: $text-warning;
        }
        span {
          border-right: none!important;
        }
      }
    }
  }
  &.border {
    .stripe-table {
      border: 1px solid $info-divider;
      border-bottom: none;
      .flex-box span {
        border-right: 1px solid $info-divider;
      }
    }
  }
  &.stripe {
    .stripe-table  {
      .tbody:nth-child(odd) {
        background: #F5F5F5;;
      }
      .tbody:nth-child(even) {
        background: #ffffff;
      }
    }
  }
}
</style>

<template>
  <div
    ref="stripe-table-wrapper"
    :class="{'stripe-table-wrapper': true, 'border': border, 'stripe': stripe}">
    <div
      class="stripe-table"
      :style="{
        'min-width': minwidth ? minwidth : 'auto'
      }">
      <div
        v-if="title.length !== 0"
        ref="title"
        class="thead flex-box">
        <span
          v-for="(item, index) in title"
          :key="index"
          :ref="'title' + index"
          :class="'level-' + flexLayout[index] || 1">
          {{ item }}
        </span>
      </div>
      <div
        class="tbody-contain"
        :style="{
          'max-height': maxheight ? maxheight : 'auto'
        }">
        <div>
          <div
            v-for="(item, index) in stripeData"
            :key="index"
            class="tbody flex-box">
            <span
              v-for="(value, i) in item"
              :key="i"
              :ref="'data_' + index + '_' + i"
              :class="'level-' + flexLayout[i] || 1">
              {{ value | formatNumber | defaultVal }}
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="total.length !== 0"
        class="tbody flex-box total">
        <span
          v-for="(value, i) in total"
          :key="i"
          :class="'level-' + flexLayout[i] || 1">
          {{ value | formatNumber }}
        </span>
      </div>
      <div
        v-if="stripeData.length === 0"
        class="tbody flex-box">
        <span class="no-data">暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default: () => []
    },
    flexLayout: {
      type: Array,
      default: () => []
    },
    minwidth: {
      type: [String, Number],
      default: ''
    },
    maxheight: {
      type: [String, Number],
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    total: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      stripeData: [],
      scrollLeft: 0,
      width: 0,
      height: 'auto'
    };
  },
  watch: {
    data: {
      handler() {
        this.stripeData = this.$util.deepCopy(this.data);
      },
      deep: true
    }
  },
  created() {
    this.stripeData = this.$util.deepCopy(this.data);
  },
  mounted() {},
  methods: {}
};
</script>
