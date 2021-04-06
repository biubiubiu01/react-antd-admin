import { Row, Col, Card } from 'antd'
import {
  GradientsBar,
  MoreBar,
  DoubleBar,
  GroupBar,
  PieBar,
} from './components'
import '@/styles/echarts.less'

const Bar = (props) => {
  return (
    <div className="bar-wrapper">
      <Row gutter={24} className="bar-list">
        <Col span={12}>
          <Card title="游戏时长统计图" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <GradientsBar />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="运动类目统计图" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <MoreBar />
            </div>
          </Card>
        </Col>
      </Row>
      <div className="bar-list">
        <Card title="用户年龄段统计图" hoverable={true} bordered={false}>
          <div className="chart-bar">
            <DoubleBar />
          </div>
        </Card>
      </div>

      <Row gutter={24} className="bar-list">
        <Col span={12}>
          <Card title="游戏热度统计图" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <GroupBar />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="运动得分" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <PieBar />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Bar
