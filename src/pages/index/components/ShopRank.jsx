import { Component } from "react";
import PropTypes from "prop-types";
import SvgIcon from "@/components/SvgIcon/index";
import { Progress } from "antd";

export default class ShopRank extends Component {
  static propTypes = {
    rankData: PropTypes.array,
  };

  rankIndex = {
    1: "diyi",
    2: "dierming",
    3: "disanming",
  };

  filterValue(val) {
    let max = this.getMax();
    if (!val || max === 0) {
      return 0;
    }
    return parseInt((val / max) * 100);
  }

  getMax() {
    const { rankData } = this.props;
    if (rankData.length === 0) return 0;
    return rankData[0].value;
  }

  render() {
    const { rankData } = this.props;
    return (
      <div className="shopRank-wrapper scrollCss">
        {rankData.map((item, index) => {
          return (
            <div className="shop-item flex" key={index}>
              <div style={{ width: "130px" }}>
                <span className="rankIndex inline-block">
                  {index < 3 ? (
                    <SvgIcon size={30} icon={this.rankIndex[index + 1]} />
                  ) : (
                    <span> {index + 1}</span>
                  )}
                </span>
                <span style={{ marginLeft: "10px" }}>{item.area}</span>
              </div>
              <Progress
                showInfo={false}
                className="flex-sub"
                strokeColor={{ from: "#3dadf6", to: "#737bfc" }}
                percent={this.filterValue(item.value)}
              />
              <div style={{ marginLeft: "10px" }}>{item.value}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
