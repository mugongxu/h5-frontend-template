/* 通用配置 */
const defaultOptions = {
  color: ['#FDD970', '#01CFB0', '#FF8E43', '#FF5D1C', '#10B356', '#E7BE78', '#FF5D1C', '#9CE4F3', '#FDE293']
};

/* 浅拷贝 */
const ecOptMerge = (options, other) => {
  const fullOptions = {};
  Object.assign(fullOptions, defaultOptions, options, other);
  return fullOptions;
};

export default {
  install(V) {
    /* eslint no-param-reassign: 0 */
    V.prototype.$ecOptMerge = ecOptMerge;
  }
};

export { ecOptMerge };
