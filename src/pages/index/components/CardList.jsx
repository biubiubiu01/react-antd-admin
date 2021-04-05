import { Row, Col, Space } from "antd";
import SvgIcon from "@/components/SvgIcon/index";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import CountUp from "react-countup";

const CardList = (props) => {
  return (
    <div className="cardList-wrapper">
      <Row gutter={24}>
        <Col xs={12} md={12} sm={12} lg={6}>
          <div
            className="card-item card-item-one"
            onClick={() => props.sendTitle("销售额", "sale")}
          >
            <div className="card-title">
              <Space size={8}>
                <SvgIcon icon="sale" size={20} /> 总销售额{" "}
              </Space>
            </div>
            <div className="all-count">
              ¥<CountUp start={0} end={12367} duration={2.2} />
              <span className="suffix">万</span>
            </div>
            <div className="card-info relative">
              <div className="abs-bottom">
                <div style={{ marginRight: "20px" }} className="inline-block">
                  日销售额：
                  <Space size={8}>
                    <span className="bold">¥ 28万</span>
                    <CaretUpOutlined className="up" />
                  </Space>
                </div>
                <div className="inline-block">
                  同比增长：
                  <Space size={8}>
                    <span className="bold">6%</span>
                    <CaretDownOutlined className="down" />
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} md={12} sm={12} lg={6}>
          <div
            className="card-item card-item-two"
            onClick={() => props.sendTitle("访问量", "visit")}
          >
            <div className="card-title">
              <Space size={8}>
                <SvgIcon icon="visit" size={20} /> 访问量
              </Space>
            </div>
            <div className="all-count">
              <CountUp start={0} end={3750} duration={2.2} />
              <span className="suffix">万次</span>
            </div>
            <div className="card-info relative">
              <div className="abs-bottom">
                <div style={{ marginRight: "20px" }} className="inline-block">
                  日访问量：
                  <Space size={8}>
                    <span className="bold">11万次</span>
                    <CaretUpOutlined className="up" />
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} md={12} sm={12} lg={6}>
          <div
            className="card-item card-item-three"
            onClick={() => props.sendTitle("加购数", "shopCard")}
          >
            <div className="card-title">
              <Space size={8}>
                <SvgIcon icon="shopCard" size={20} fill="#fff" /> 加购数
              </Space>
            </div>
            <div className="all-count">
              <CountUp start={0} end={129795} duration={2.2} />
              <span className="suffix">个</span>
            </div>
            <div className="card-info relative">
              <div className="abs-bottom">
                <div style={{ marginRight: "20px" }} className="inline-block">
                  日加购数：
                  <Space size={8}>
                    <span className="bold">1575</span>
                    <CaretUpOutlined className="up" />
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} md={12} sm={12} lg={6}>
          <div
            className="card-item card-item-four"
            onClick={() => props.sendTitle("支付数", "pay")}
          >
            <div className="card-title">
              <Space size={8}>
                <SvgIcon icon="pay" size={20} fill="#fff" /> 支付笔数
              </Space>
            </div>
            <div className="all-count">
              <CountUp start={0} end={13996} duration={2.2} />
              <span className="suffix">笔</span>
            </div>
            <div className="card-info relative">
              <div className="abs-bottom">
                <div style={{ marginRight: "20px" }} className="inline-block">
                  日支付数：
                  <Space size={8}>
                    <span className="bold">1950</span>
                    <CaretDownOutlined className="up" />
                  </Space>
                </div>
                <div className="inline-block">
                  转换率：
                  <Space size={8}>
                    <span className="bold">66%</span>
                    <CaretUpOutlined className="down" />
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CardList;
