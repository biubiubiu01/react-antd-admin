import { Component } from 'react'
import { debounce } from '@/utils/index'
const echarts = require('echarts')

class TreeChart extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize()
    }
  }, 100)

  myChart = null

  async componentDidMount() {
    this.initResizeEvent()
    this.myChart = echarts.init(this.TreeChart)
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
        color: [
          '#6FFFFF',
          '#FF9244',
          '#7155B7',
          '#0FE7E7',
          '#48C7F2',
          '#4490FF',
        ],
        tooltip: {},
        series: [
          {
            name: '矩形树图',
            type: 'treemap',
            roam: false,
            label: {
              show: true,
              formatter: '{b}',
              fontSize: 14,
            },
            nodeClick: false,
            breadcrumb: {
              show: false,
            },
            itemStyle: {
              show: true,
              textStyle: {
                color: '#666',
                fontSize: 14,
              },
              borderWidth: 0,
            },
            data: [
              {
                name: 'Vue',
                value: 6000,
              },
              {
                name: 'React',
                value: 6600,
              },
              {
                name: 'Angular',
                value: 3200,
              },
              {
                name: 'uni-app',
                value: 2100,
              },
              {
                name: 'mpvue',
                value: 172,
              },
              {
                name: 'Taro',
                value: 179,
              },
              {
                name: 'element-ui',
                value: 293,
              },
              {
                name: 'vant',
                value: 200,
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
        ref={(TreeChart) => (this.TreeChart = TreeChart)}
      />
    )
  }
}

export default TreeChart
