import { Component } from 'react'
import { debounce } from '@/utils/index'
import PropTypes from 'prop-types'
const echarts = require('echarts')
require('echarts-wordcloud')

class HotChart extends Component {
  static propTypes = {
    chartData: PropTypes.array.isRequired,
  }

  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize()
    }
  }, 100)

  myChart = null

  colorList = ['#4FD8FF', '#C15FFF', '#FF5F55', '#FFC935', '#767BFB']

  async componentDidMount() {
    this.initResizeEvent()
    this.myChart = echarts.init(this.HotChart)
  }

  async componentDidUpdate() {
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
    const { chartData } = this.props
    this.myChart.setOption(
      {
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/> 搜素次数：{c} 次',
        },
        series: [
          {
            type: 'wordCloud',
            sizeRange: [12, 26],
            rotationRange: [0, 0],
            width: '100%',
            shape: 'cardioid',
            gridSize: 10,
            top: 0,
            textStyle: {
              fontFamily: 'sans-serif',
              color: () => {
                return this.colorList[
                  Math.floor(Math.random() * this.colorList.length)
                ]
              },
            },
            data: chartData,
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
        style={{ width: '100%', height: '300px' }}
        ref={(HotChart) => (this.HotChart = HotChart)}
      />
    )
  }
}

export default HotChart
