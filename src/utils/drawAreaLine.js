import { ecOptMerge } from '../plugins/ecOptMerge';
import { echarts } from '../plugins/echarts';

/**
 * el：画图容器id
 * data：series数据data
 * xAxis：x轴数据
 * xtitle：x轴标题 ytitle：y轴标题
 * other：自定义需要覆盖的属性配置
 */
const drawAreaLine = (el, data = [], xAxis = [], { xtitle, ytitle, unit, yInverse, showTooltip } = {}, other = {}, cb) => {
  let legend = [];
  const series = data.map((item, index) => {
    legend.push(item.name);
    return {
      name: item.name,
      data: item.data,
      type: 'line',
      lineStyle: {
        color: item.color,
        width: 1.5
      },
      itemStyle: {
        color: item.color
      }
    };
  });
  // 赋值配置
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      showContent: true,
      formatter: function (params) {
        let formatter = params[0]?.name || '';
        const values = params.map(item => {
          formatter += `<br />${item.seriesName}：${item.value}${unit}`;
          return {
            name: item.name,
            value: item.value
          };
        });
        cb && cb(values);
        return showTooltip ? formatter : '';
      }
    },
    legend: {
      data: [...legend],
      itemGap: 30,
      itemHeight: 2,
      itemWidth: 10,
      textStyle: {
        color: '#666',
        fontSize: 13
      },
      top: 10
    },
    xAxis: {
      type: 'category',
      name: xtitle,
      boundaryGap: true,
      nameTextStyle: {
        color: '#333333'
      },
      nameLocation: 'center',
      nameGap: 30,
      axisLine: {
        lineStyle: {
          color: '#E5E5E5'
        }
      },
      axisLabel: {
        color: '#999999'
      },
      axisTick: {
        inside: true
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ' #E5E5E5',
          width: 1
        }
      },
      data: xAxis
    },
    yAxis: {
      type: 'value',
      name: ytitle,
      axisLine: {
        lineStyle: {
          color: '#E5E5E5'
        }
      },
      axisLabel: {
        color: '#999999',
        formatter: `{value}${unit}`
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: ' #E5E5E5',
          width: 1
        }
      },
      // 翻转y轴
      inverse: !!yInverse
    },
    series: [...series]
  };
  // 配置合并公共参数
  const fullOptions = {};
  Object.assign(fullOptions, options);
  const newOptions = ecOptMerge(fullOptions, other);
  // 画图
  let chart = echarts.init(document.getElementById(el));
  chart.setOption(newOptions, true);
  return chart;
};

export default drawAreaLine;
