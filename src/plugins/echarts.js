// 引入echarts核心库和折线图
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
// require('echarts/lib/chart/pie');
// require('echarts/lib/chart/funnel');
require('echarts/lib/chart/line');
// require('echarts/lib/chart/gauge');
// require('echarts/lib/chart/radar');
require('echarts/lib/chart/scatter');
// 引入提示框和标题组件和注释
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/dataZoom');

export default {
  install(V) {
    /* eslint no-param-reassign: 0 */
    V.prototype.$ec = echarts;
    // V.prototype.$colors = color;
  }
};

export { echarts };
