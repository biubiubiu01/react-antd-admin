import { Card } from "antd";
import "@/styles/echarts.less";

const mapChart = (props) => {
  return (
    <div className="bar-wrapper">
      <div className="bar-list">
        <Card title="分布图 (点击可下钻到县)" hoverable={true} bordered={false}>
          <div style={{ height: "600px" }}></div>
        </Card>
      </div>
      <div className="bar-list">
        <Card title="散点图 (点击可下钻到县)" hoverable={true} bordered={false}>
          <div style={{ height: "600px" }}></div>
        </Card>
      </div>
      <div className="bar-list">
        <Card title="热力图" hoverable={true} bordered={false}>
          <div style={{ height: "600px" }}></div>
        </Card>
      </div>
      <div className="bar-list">
        <Card title="航线图" hoverable={true} bordered={false}>
          <div style={{ height: "600px" }}></div>
        </Card>
      </div>
      <div className="bar-list">
        <Card title="时间轴地图" hoverable={true} bordered={false}>
          <div style={{ height: "600px" }}></div>
        </Card>
      </div>
    </div>
  );
};

export default mapChart;
