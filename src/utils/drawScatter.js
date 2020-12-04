import { ecOptMerge } from '../plugins/ecOptMerge';
import { echarts } from '../plugins/echarts';

/**
 * el：画图容器id
 * data：series数据data
 * xAxis：x轴数据
 * xtitle：x轴标题 ytitle：y轴标题
 * other：自定义需要覆盖的属性配置
 */
const drawScatter = (el, data, { xtitle, ytitle, ztitle, xunit = '', yunit = '', zunit = '' } = {}, other = {}) => {
  const series = data.map((item, index) => {
    return {
      name: item.name,
      data: item.data,
      type: 'scatter',
      itemStyle: {
        color: item.color
      },
      symbolSize: function (data) {
        return Math.sqrt(data[2]) * 5;
      },
      label: {
        show: true,
        formatter: '{@[2]}'
      }
    };
  });
  // 赋值配置
  const options = {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        let formatter = params.seriesName || '';
        formatter += `<br />${ytitle}：${params.value[1]}${yunit}`;
        formatter += `<br />${xtitle}：${params.value[0]}${xunit}`;
        formatter += `<br />${ztitle}：${params.value[2]}${zunit}`;
        return formatter;
      }
    },
    xAxis: {
      type: 'value',
      name: xtitle,
      nameLocation: 'center',
      nameGap: 30,
      nameTextStyle: {
        color: '#999999'
      },
      axisLine: {
        lineStyle: {
          color: '#E5E5E5'
        }
      },
      axisLabel: {
        color: '#999999',
        formatter: `{value}${xunit}`
      },
      axisTick: {
        inside: true
      },
      splitLine: {
        show: false
      },
      max: 100
    },
    yAxis: {
      type: 'value',
      name: ytitle,
      nameTextStyle: {
        color: '#999999'
      },
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
        formatter: `{value}${yunit}`
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

export default drawScatter;
