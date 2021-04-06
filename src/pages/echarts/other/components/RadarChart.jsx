import { Component } from 'react'
import { debounce } from '@/utils/index'
const echarts = require('echarts')

class RadarChart extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize()
    }
  }, 100)

  myChart = null

  async componentDidMount() {
    this.initResizeEvent()
    this.myChart = echarts.init(this.RadarChart)
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
    this.myChart.setOption(
      {
        color: ['#FF9E8C', '#00D2C9'],
        tooltip: {
          trigger: 'item',
        },
        legend: {
          icon: 'circle',
          show: true,
          right: '5',
          top: '10',
          itemWidth: 10,
          itemHeight: 11,
          data: ['2019', '2020'],
        },
        radar: {
          center: ['42%', '50%'],
          radius: '70%',
          axisNameGap: 15,
          startAngle: 90,
          splitNumber: 4,
          axisName: {
            color: '#666',
            fontSize: 14,
          },
          shape: 'circle',
          splitArea: {
            areaStyle: {
              color: ['transparent'],
            },
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(63,133,247,0.3)',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(63,133,247,0.3)',
            },
          },
          indicator: [
            {
              name: 'JavaScrpt',
              max: 100,
            },
            {
              name: 'Vue',
              max: 100,
            },
            {
              name: 'jQuery',
              max: 100,
            },
            {
              name: 'TypeScript',
              max: 100,
            },
            {
              name: 'Echarts',
              max: 100,
            },
            {
              name: 'webpack',
              max: 100,
            },
          ],
        },
        series: [
          {
            name: '2020',
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1,
            },
            itemStyle: {
              shadowColor: 'rgb(58,115,192)',
              shadowBlur: 15,
            },
            data: [
              {
                value: [75, 85, 80, 80, 90, 90],
                name: '2020',
              },
            ],
          },
          {
            name: '2019',
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1,
            },
            itemStyle: {
              shadowColor: 'rgb(58,115,192)',
              shadowBlur: 15,
            },
            data: [
              {
                value: [95, 75, 75, 50, 40, 20],
                name: '2019',
              },
            ],
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
        ref={(RadarChart) => (this.RadarChart = RadarChart)}
      />
    )
  }
}

export default RadarChart
