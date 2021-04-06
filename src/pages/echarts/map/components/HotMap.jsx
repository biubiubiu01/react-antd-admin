import { Component } from 'react'
import { debounce } from '@/utils/index'
import { getGeoJson } from '@/utils/index'
import { getHotMapChartData } from '../../../../mock/controller/map'
const echarts = require('echarts')

class HotMap extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize()
    }
  }, 100)

  myChart = null
  geoJson = {}

  async componentDidMount() {
    this.initResizeEvent()
    this.myChart = echarts.init(this.HotMap)
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
    getGeoJson(420100).then((data) => {
      this.geoJson = data
      this.getMapData()
    })
  }

  //获取地图数据   模拟数据   数据格式：[{name:'武汉市',value:96},{name:'长沙市',value:75}]
  // 必须要写成这种,而且name名字要和地图的geoJson名字一样，不然渲染不出来
  getMapData = () => {
    getHotMapChartData(420100).then((res) => {
      const data = res.data
      this.setOption(data)
    })
  }

  setOption(data) {
    echarts.registerMap('map', this.geoJson) //注册
    const mapData = data.sort((a, b) => {
      return b.value[2] - a.value[2]
    })
    let max = mapData[0].value[2]
    let min = mapData[mapData.length - 1].value[2]
    if (mapData.length === 1) {
      min = 0
    }

    this.myChart.setOption(
      {
        tooltip: {},
        visualMap: {
          left: '3%',
          bottom: '2%',
          color: ['#ff4601', '#fffc00', '#87cffa'],
          min: min,
          max: max,
          calculable: true,
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
        },
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
              areaColor: '#8dd7fc',
              borderWidth: 1.6,
            },
          },
          zoom: 1.22,
        },
        series: [
          {
            name: 'hotMap',
            type: 'heatmap',
            data: mapData,
            coordinateSystem: 'geo',
            pointSize: 13,
            blurSize: 40,
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
        ref={(HotMap) => (this.HotMap = HotMap)}
      ></div>
    )
  }
}

export default HotMap
