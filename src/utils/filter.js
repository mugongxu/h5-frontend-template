const filter = {
  // 设置默认值
  defaultVal: function(value, defaultVal) {
    let defaultValue = defaultVal || '- -';
    if (value || value === 0) {
      return value;
    } else {
      return defaultValue;
    }
  },
  // 转换数值
  formatNumber(value, format) {
    if (!Number(value)) {
      return (value || 0);
    }
    format = format || ',';
    if (value && value !== null) {
      value = String(value);
      let tempArr = value.split('.');
      let left = tempArr[0];
      let right = tempArr[1];
      right = right ? '.' + right.substring(0, 2) : '';
      let temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
      return (Number(value) < 0 ? '-' : '') + temp.join(format).split('').reverse().join('') + right;
    } else if (value === 0) {
      return '0';
    } else {
      return '- -';
    }
  },
  // 成员类型1.先生 2.太太 3.孩子 4.父母
  getMemberTypeName(val, sex) {
    let str = '';
    switch(val) {
      case 1:
        str = '先生';
        break;
      case 2:
        str = '太太';
        break;
      case 3:
        str = '孩子';
        if(sex === 0) {
          str = '儿子';
        } else if(sex === 1) {
          str = '女儿';
        }
        break;
      case 4:
        str = '父母';
        if(sex === 0) {
          str = '爷爷/外公';
        } else if(sex === 1) {
          str = '奶奶/外婆';
        }
        break;
    }
    return str;
  },
  getPolicyHolder(val) {
    if (val === 0) {
      return '本人';
    } else if (val === 1) {
      return '先生';
    } else if (val === 2) {
      return '太太';
    } else {
      return '- -';
    }
  }
};

export default filter;
