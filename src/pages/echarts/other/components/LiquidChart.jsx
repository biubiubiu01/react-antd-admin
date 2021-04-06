import { Component } from 'react'
import { debounce } from '@/utils/index'
const echarts = require('echarts')
require('echarts-liquidfill')

class LiquidChart extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize()
    }
  }, 100)

  myChart = null

  async componentDidMount() {
    this.initResizeEvent()
    this.myChart = echarts.init(this.LiquidChart)
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
        series: [
          {
            type: 'liquidFill',
            radius: '85%',
            center: ['50%', '45%'],
            data: [0.48, 0.48, 0.48, 0.48],
            backgroundStyle: {
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0.5,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: 'rgba(168, 218, 247, 0.4)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(168, 218, 247, 0.5)',
                  },
                  {
                    offset: 0,
                    color: 'rgba(168, 218, 247, 0.8)',
                  },
                ],
                globalCoord: false,
              },
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 5,
                borderColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(81,142,215, 0)',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(53,142,215, 0.45)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(53,142,215, 0.6)',
                    },
                  ],
                  globalCoord: false,
                },
                shadowColor: 'rgba(66,102,247, 0.55)',
                shadowBlur: 10,
              },
            },
            label: {
              formatter: '48%',
              fontSize: 35,
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
        ref={(LiquidChart) => (this.LiquidChart = LiquidChart)}
      />
    )
  }
}

export default LiquidChart
