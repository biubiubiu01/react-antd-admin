import { Component } from 'react'
import { debounce } from '@/utils/index'
import { getGeoJson } from '@/utils/index'
import { getPointChartData } from '../../../../mock/controller/map'
const echarts = require('echarts')

class LineMap extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize()
    }
  }, 100)

  myChart = null
  geoJson = {}

  async componentDidMount() {
    this.initResizeEvent()
    this.myChart = echarts.init(this.LineMap)
    this.getMapJson()
  }

  componentWillUnmount() {
    this.destroyResizeEvent()
    if (!this.myChart) {
      return
    }
    this.myChart.off('click')
  }

  getMapJson = () => {
    getGeoJson(420000).then((data) => {
      this.geoJson = data
      this.getMapData()
    })
  }

  //获取地图数据   模拟数据   数据格式：[{name:'武汉市',value:96},{name:'长沙市',value:75}]
  // 必须要写成这种,而且name名字要和地图的geoJson名字一样，不然渲染不出来
  getMapData = () => {
    getPointChartData(420000).then((res) => {
      const data = res.data
      this.setOption(data)
    })
  }

  setOption(data) {
    echarts.registerMap('map', this.geoJson) //注册
    const mapData = data.sort((a, b) => {
      return b.value[2] - a.value[2]
    })

    let toCity = mapData[0]
    let lineData = mapData.slice(1).map((item) => {
      return {
        fromName: item.name,
        toName: toCity.name,
        coords: [
          [item.value[0], item.value[1]],
          [toCity.value[0], toCity.value[1]],
        ],
      }
    })

    this.myChart.setOption(
      {
        tooltip: {},

        geo: {
          map: 'map',
          roam: true,
          itemStyle: {
            areaColor: '#17439a',
            borderColor: '#53D9FF',
            borderWidth: 1.3,
            shadowBlur: 15,
            shadowColor: 'rgb(58,115,192)',
            shadowOffsetX: 7,
            shadowOffsetY: 6,
          },
          label: {
            show: true,
            color: 'rgb(249, 249, 249)', //省份标签字体颜色
            formatter: (p) => {
              switch (p.name) {
                case '内蒙古自治区':
                  p.name = '内蒙古'
                  break
                case '西藏自治区':
                  p.name = '西藏'
                  break
                case '新疆维吾尔自治区':
                  p.name = '新疆'
                  break
                case '宁夏回族自治区':
                  p.name = '宁夏'
                  break
                case '广西壮族自治区':
                  p.name = '广西'
                  break
                case '香港特别行政区':
                  p.name = '香港'
                  break
                case '澳门特别行政区':
                  p.name = '澳门'
                  break
                default:
                  break
              }
              return p.name
            },
          },
          emphasis: {
            label: {
              show: true,
              color: '#ff0',
            },
            itemStyle: {
              areaColor: '#17439a',
              borderWidth: 1.6,
            },
          },
          zoom: 1.22,
        },
        series: [
          {
            name: '城市',
            type: 'effectScatter',
            data: mapData.slice(1),
            coordinateSystem: 'geo',
            symbolSize: 10,
            label: {
              show: false,
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            itemStyle: {
              color: 'rgb(29,233,182)',
              shadowBlur: 10,
              shadowColor: 'rgb(58,115,192)',
            },
            layoutCenter: ['50%', '50%'],
            layoutSize: 430,
          },
          {
            name: 'No.1',
            type: 'effectScatter',
            data: mapData.slice(0, 1),
            coordinateSystem: 'geo',
            symbolSize: 25,
            label: {
              show: false,
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            itemStyle: {
              color: '#f4e925', //地图点的颜色
              shadowBlur: 10,
              shadowColor: 'rgb(58,115,192)',
            },
            layoutCenter: ['50%', '50%'],
            layoutSize: 430,
          },
          {
            name: '航线',
            type: 'lines',
            tooltip: {
              formatter: (params) => {
                return (
                  params.marker +
                  params.data.fromName +
                  '-' +
                  params.data.toName
                )
              },
            },
            zlevel: 2,
            effect: {
              show: true,
              period: 5, //值越小 速度越快
              trailLength: 0, // 0-1  值越大，越拖
              symbol: 'arrow', //箭头图标
              symbolSize: 6, //图标大小
            },
            lineStyle: {
              color: '#f4e925',
              width: 1,
              opacity: 1,
              curveness: 0.3, //线值的程度  0为直线
            },
            data: lineData,
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
        ref={(LineMap) => (this.LineMap = LineMap)}
      ></div>
    )
  }
}

export default LineMap
