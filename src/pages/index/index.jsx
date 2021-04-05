import { Component } from "react";
import { Row, Col, Card } from "antd";
import "./style.less";
import {
  CardList,
  SaleTitle,
  LineChart,
  ShopRank,
  PieChart,
  HotChart,
  MoreChart,
} from "./components";
import {
  getLineChartData,
  getRankShopData,
  getPieTypeData,
  getHotSearchData,
  getMoreData,
} from "@/api/dashboard";

export default class Index extends Component {
  state = {
    currentName: "销售额",
    currentKey: "sale",
    currentType: "day",
    lineData: {},
    rankData: [],
    pieData: [],
    hotData: [],
    moreData: [],
  };

  componentDidMount() {
    this.getData();
  }

  getTitle = (title, key) => {
    if (title == this.state.currentName) {
      return;
    }
    this.setState({
      currentName: title,
      currentKey: key,
    });

    this.getLineData();
    this.getRankData();
  };

  getCurrent = (type) => {
    this.setState(
      {
        currentType: type,
      },
      () => {
        this.getData();
      }
    );
  };

  getData() {
    this.getLineData();
    this.getRankData();
    this.getPieData();
    this.getHotData();
    this.getMoreData();
  }

  async getLineData() {
    const { currentType: type, currentKey } = this.state;
    const { data } = await getLineChartData({ type, currentKey });
    this.setState({
      lineData: data || [],
    });
  }

  async getRankData() {
    const { currentType: type, currentKey } = this.state;
    const { data } = await getRankShopData({ type, currentKey });
    this.setState({
      rankData: data || [],
    });
  }

  async getPieData() {
    const { currentType: type } = this.state;
    const { data } = await getPieTypeData({ type });
    this.setState({
      pieData: data || [],
    });
  }

  async getHotData() {
    const { currentType: type } = this.state;
    const { data } = await getHotSearchData({ type });
    this.setState({
      hotData: data || [],
    });
  }

  async getMoreData() {
    const { currentType: type } = this.state;
    const { data } = await getMoreData({ type });
    this.setState({
      moreData: data || [],
    });
  }

  render() {
    const {
      currentName,
      lineData,
      rankData,
      pieData,
      hotData,
      moreData,
    } = this.state;
    return (
      <div className="index-container  border-box">
        <CardList sendTitle={this.getTitle} />
        <div className="sale-card">
          <SaleTitle sendCurrent={this.getCurrent}>
            {currentName} 统计图
          </SaleTitle>
          <Row className="sale-container" gutter={16}>
            <Col span={16} style={{ height: "100%" }}>
              <LineChart chartData={lineData} title={currentName} />
            </Col>
            <Col span={8} style={{ height: "100%" }}>
              <div className="shop-title">门店{currentName}排行榜 Top10</div>
              <ShopRank rankData={rankData} />
            </Col>
          </Row>
        </div>

        <Row gutter={24} className="sale-list">
          <Col span={8}>
            <Card title="消费种类占比" hoverable={true} bordered={false}>
              <PieChart chartData={pieData} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="热门搜索" hoverable={true} bordered={false}>
              <HotChart chartData={hotData} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="到店人数统计" hoverable={true} bordered={false}>
              <MoreChart chartData={moreData} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
