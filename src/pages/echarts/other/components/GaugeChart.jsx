import { Component } from 'react'
import { debounce } from '@/utils/index'
const echarts = require('echarts')

class GaugeChart extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize()
    }
  }, 100)

  myChart = null

  async componentDidMount() {
    this.initResizeEvent()
    this.myChart = echarts.init(this.GaugeChart)
    this.setOption()
  }

  componentWillUnmount() {
    this.destroyResizeEvent()
    if (!this.myChart) {
      return
    }
    this.myChart.off('click')
  }

  setOption() {
    const value = 85.45
    this.myChart.setOption(
      {
        color: ['#37A2DA', '#32C5E9', '#67E0E3'],
        title: [
          {
            text: 'Km/h',
            top: '30%',
            left: 'center',
            textStyle: {
              color: '#5171fd',
              fontSize: 18,
            },
          },
          {
            text: '85.45',
            bottom: '20%',
            left: 'center',
            textStyle: {
              color: '#5171fd',
              fontSize: 24,
            },
          },
        ],
        series: [
          {
            type: 'gauge',
            center: ['50%', '52%'],
            radius: '83.10%',
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: 100,
            axisLine: {
              show: true,
              lineStyle: {
                width: 25,
                shadowBlur: 0,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d'],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: 0,
            },
            axisLabel: {
              show: 0,
            },
            pointer: {
              show: true,
              length: '100%',
              radius: '20%',
              width: 5, //指针粗细
            },
            itemStyle: {
              color: '#4389F6',
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: value,
              },
            ],
          },
          //刻度
          {
            type: 'gauge',
            radius: '78%',
            center: ['50%', '52%'],
            splitNumber: 10,
            min: 0,
            max: 100,
            startAngle: 225,
            endAngle: -45,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: true,
              length: 12,
              lineStyle: {
                color: '#b3efff',
                width: 2,
                shadowColor: 'rgb(58,115,192)',
                shadowBlur: 15,
              },
            },
            pointer: {
              show: 0,
            },
            detail: {
              show: 0,
            },
          },
        ],
      },
      true
    )
  }

  //监听resize
  initResizeEvent() {
    window.addEventListener('resize', this.resizeHandler)
  }

  //移除resize
  destroyResizeEvent() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  render() {
    return (
      <div
        className="chart-wrapper"
        ref={(GaugeChart) => (this.GaugeChart = GaugeChart)}
      />
    )
  }
}

export default GaugeChart
