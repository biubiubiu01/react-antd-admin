import { Row, Col, Card } from 'antd'
import {
  LiquidChart,
  GaugeChart,
  WordChart,
  RadarChart,
  TreeChart,
} from './components'
import '@/styles/echarts.less'

const Line = (props) => {
  return (
    <div className="bar-wrapper">
      <Row gutter={24} className="bar-list">
        <Col span={12}>
          <Card title="水球图" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <LiquidChart />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="仪表盘" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <GaugeChart />
            </div>
          </Card>
        </Col>
      </Row>

      <div className="bar-list">
        <Card title="词云图" hoverable={true} bordered={false}>
          <div className="chart-bar">
            <WordChart />
          </div>
        </Card>
      </div>

      <Row gutter={24} className="bar-list">
        <Col span={12}>
          <Card title="雷达图" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <RadarChart />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="矩形树图" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <TreeChart />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Line
