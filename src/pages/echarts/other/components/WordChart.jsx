import { Component } from 'react'
import { debounce } from '@/utils/index'
import { message } from 'antd'
const echarts = require('echarts')
require('echarts-wordcloud')

class WordChart extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize()
    }
  }, 100)

  myChart = null

  colorList = ['#4FD8FF', '#C15FFF', '#FF5F55', '#FFC935', '#767BFB']

  async componentDidMount() {
    this.initResizeEvent()
    this.myChart = echarts.init(this.WordChart)
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
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/> 搜素次数：{c} 次',
        },
        series: [
          {
            type: 'wordCloud',
            sizeRange: [12, 35],
            rotationRange: [0, 0],
            width: '100%',
            shape: 'cardioid',
            gridSize: 11,
            top: 0,
            textStyle: {
              fontFamily: 'sans-serif',
              color: () => {
                return this.colorList[
                  Math.floor(Math.random() * this.colorList.length)
                ]
              },
            },
            data: [
              {
                name: '小笼包',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '炸鸡',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '汉堡',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '蜜雪冰城',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '一点点',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '喜茶',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '贡茶',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '热干面',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '螺蛳粉',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '臭豆腐',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '麻辣烫',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '过桥米线',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '大盘鸡',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '披萨',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '鸡公煲',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '烤全羊',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '肉夹馍',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '烤冷面',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '炒酸奶',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '卫龙',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '烤鸭',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '灌汤包',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '鸭血粉丝',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '糯米团',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '酸辣粉',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '汤圆',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '羊肉泡馍',
                value: Math.random(0.1, 1) * 70,
              },
              {
                name: '糊辣汤',
                value: Math.random(0.1, 1) * 70,
              },
            ],
          },
        ],
      },
      true
    )
    this.myChart.off('click')
    this.myChart.on('click', (params) => {
      message.success('点击了' + params.name)
    })
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
        ref={(WordChart) => (this.WordChart = WordChart)}
      />
    )
  }
}

export default WordChart
