<style lang="scss" scoped>
.lable-item-wrapper {
  display: inline-block;
  width: 100%;
  .label-content {
    position: relative;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: rem(10) rem(15);
    .label {
      display: inline-block;
      position: relative;
      font-size: rem(18);
      color: $text-primary;
      vertical-align: middle;
      padding-left: rem(12);
      &:before {
        display: block;
        position: absolute;
        content: '';
        height: rem(14);
        width: rem(4);
        left: 0;
        top: 50%;
        margin-top: rem(-7);
        background: $primary-color;
      }
    }
    .label-desc {
      color: $text-warning;
    }
    .label-btn {
      position: absolute;
      right: rem(15);
    }
  }
}
</style>

<template>
  <div class="lable-item-wrapper">
    <div class="label-content van-hairline--bottom">
      <label class="label">{{ label }}</label>
      <span v-if="desc" class="label-desc">
        {{ desc }}
      </span>
      <span class="label-btn">
        <span class="font-size-12 font-weak mr-5" @click="$emit('btn-click')">{{ btn }}</span>
        <van-icon :name="btn ? 'arrow' : 'arrow-down'" color="#D8D8D8" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      default: ''
    },
    btn: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  }
};
</script>
