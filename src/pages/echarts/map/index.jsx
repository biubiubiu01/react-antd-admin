import { Card } from 'antd'
import { SeriesMap, ScatterMap, HotMap, LineMap } from './components'
import '@/styles/echarts.less'

const mapChart = (props) => {
  return (
    <div className="bar-wrapper">
      <div className="bar-list map">
        <Card title="分布图 (点击可下钻到县)" hoverable={true} bordered={false}>
          <div className="mapChart">
            <SeriesMap />
          </div>
        </Card>
      </div>
      <div className="bar-list map">
        <Card title="散点图 (点击可下钻到县)" hoverable={true} bordered={false}>
          <div className="mapChart">
            <ScatterMap />
          </div>
        </Card>
      </div>
      <div className="bar-list map">
        <Card title="热力图" hoverable={true} bordered={false}>
          <div className="mapChart">
            <HotMap />
          </div>
        </Card>
      </div>
      <div className="bar-list map">
        <Card title="航线图" hoverable={true} bordered={false}>
          <div className="mapChart">
            <LineMap />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default mapChart
