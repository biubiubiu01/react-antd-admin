import { Card } from "antd";
import SurroundGraph from "./components/SurroundGraph";
import TreeGraph from "./components/TreeGraph";
import "@/styles/echarts.less";

const graph = (props) => {
  return (
    <div className="bar-wrapper">
      <div className="bar-list">
        <Card title="PHP天下第一" hoverable={true} bordered={false}>
          <div style={{ height: "550px" }}>
            <SurroundGraph />
          </div>
        </Card>
      </div>
      <div className="bar-list">
        <Card title="海贼王人物关系图" hoverable={true} bordered={false}>
          <div style={{ height: "750px" }}>
            <TreeGraph />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default graph;
