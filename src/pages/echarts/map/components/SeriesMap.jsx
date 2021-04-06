import { Component } from 'react'
import { debounce } from '@/utils/index'
import { getGeoJson } from '@/utils/index'
import { getMapChartData } from '../../../../mock/controller/map'
const echarts = require('echarts')

class SeriesMap extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize()
    }
  }, 100)

  state = {
    parentInfo: [
      {
        cityName: '全国',
        code: 100000,
      },
    ],
  }

  myChart = null
  geoJson = {}

  async componentDidMount() {
    this.initResizeEvent()
    this.myChart = echarts.init(this.SeriesMap)
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
    const { parentInfo } = this.state
    getGeoJson(parentInfo[parentInfo.length - 1].code).then((data) => {
      this.geoJson = data
      this.getMapData()
    })
  }

  //获取地图数据   模拟数据   数据格式：[{name:'武汉市',value:96},{name:'长沙市',value:75}]
  // 必须要写成这种,而且name名字要和地图的geoJson名字一样，不然渲染不出来
  getMapData = () => {
    const { parentInfo } = this.state
    getMapChartData(parentInfo[parentInfo.length - 1].code).then((res) => {
      const data = res.data
      this.setOption(data)
    })
  }

  setOption(data) {
    echarts.registerMap(
      this.state.parentInfo.length === 1 ? 'china' : 'map',
      this.geoJson
    ) //注册
    const mapData = data.sort((a, b) => {
      return b.value - a.value
    })
    let max = mapData[0].value
    let min = mapData[mapData.length - 1].value
    if (mapData.length === 1) {
      min = 0
    }

    this.myChart.setOption(
      {
        tooltip: {},
        visualMap: {
          min: min,
          max: max,
          left: '3%',
          bottom: '2%',
          calculable: true,
          inRange: {
            color: ['#24CFF4', '#2E98CA', '#1E62AC'],
          },
          textStyle: {
            color: '#24CFF4',
          },
        },
        series: [
          {
            name: '地图',
            type: 'map',
            map: this.state.parentInfo.length === 1 ? 'china' : 'map',
            roam: true, //是否可缩放
            zoom: 1.22, //缩放比例
            data: mapData,
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
                shadowBlur: 25,
              },
            },
            itemStyle: {
              areaColor: '#24CFF4',
              borderColor: '#53D9FF',
              borderWidth: 1.3,
              shadowBlur: 15,
              shadowColor: 'rgb(58,115,192)',
              shadowOffsetX: 7,
              shadowOffsetY: 6,
            },
          },
        ],
      },
      true
    )
    this.myChart.off('click')
    this.myChart.on('click', (params) => {
      const data = params.data
      if (
        this.state.parentInfo[this.state.parentInfo.length - 1].code ==
        data.adcode
      ) {
        return
      }
      let temp = [...this.state.parentInfo]
      temp.push({
        cityName: data.name,
        code: data.adcode,
      })
      this.setState(
        {
          parentInfo: temp,
        },
        () => {
          this.getMapJson()
        }
      )
    })
  }

  returnPrev = () => {
    let temp = [...this.state.parentInfo]
    if (temp.length === 1) {
      return
    }
    temp.pop()
    this.setState(
      {
        parentInfo: temp,
      },
      () => {
        this.getMapJson()
      }
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
      <div className="chart-wrapper relative">
        <div
          className="chart-wrapper"
          ref={(SeriesMap) => (this.SeriesMap = SeriesMap)}
        ></div>
        <div
          className={`return ${
            this.state.parentInfo.length == 1 ? 'none' : 'block'
          }`}
          onClick={this.returnPrev}
        >
          返回
        </div>
      </div>
    )
  }
}

export default SeriesMap
