import API from '../apis';

export default {
  install(V) {
    /* eslint no-param-reassign: 0 */
    V.prototype.$api = API;
  }
};
