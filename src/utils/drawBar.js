import { ecOptMerge } from '../plugins/ecOptMerge';
import { echarts } from '../plugins/echarts';

/**
 * el：画图容器id
 * data：series数据data
 * xAxis：x轴数据
 * xtitle：x轴标题 ytitle：y轴标题
 * other：自定义需要覆盖的属性配置
 */
const drawBar = (el, data, xAxis, { xtitle, ytitle, unit = '' } = {}, other = {}) => {
  let legend = [];
  let formatter = '{b}';
  const series = data.map((item, index) => {
    legend.push(item.name);
    formatter += `<br />{a${index}}: {c${index}}${unit}`;
    return {
      name: item.name,
      data: item.data,
      type: 'bar',
      itemStyle: {
        color: item.color
      },
      barCategoryGap: '3px',
      barWidth: 5
    };
  });
  // 赋值配置
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter
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
      nameTextStyle: {
        color: '#333333'
      },
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
      data: xAxis
    },
    yAxis: {
      type: 'value',
      name: ytitle,
      axisLine: {
        lineStyle: {
          width: 1,
          color: '#E5E5E5'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999999',
        formatter: `{value}${unit}`
      },
      splitLine: {
        lineStyle: {
          color: '#E5E5E5',
          width: 1
        }
      }
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

export default drawBar;
