import { Component } from "react";
import { debounce } from "@/utils/index";
import PropTypes from "prop-types";
const echarts = require("echarts");

class PieChart extends Component {
  static propTypes = {
    chartData: PropTypes.array.isRequired,
  };

  colorList = [
    "#4FD8FF",
    "#C15FFF",
    "#FF5F55",
    "#FFC935",
    "#767BFB",
    "rgb(248,70,102)",
  ];

  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.pieChart);
  }

  async componentDidUpdate() {
    this.setOption();
  }

  componentWillUnmount() {
    this.destroyResizeEvent();
    if (!this.myChart) {
      return;
    }
    this.myChart.off("click");
  }

  setOption() {
    const { chartData } = this.props;
    this.myChart.setOption(
      {
        color: this.colorList,
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            return (
              params.marker +
              " " +
              params.name +
              "：" +
              params.value +
              " (" +
              params.percent +
              "%)"
            );
          },
        },
        legend: {
          show: true,
          left: "15",
          top: 0,
          type: "scroll",
          itemWidth: 18,
          itemHeight: 11,
          data: chartData.map((item) => item.name),
        },
        series: [
          {
            name: "消费类型",
            type: "pie",
            icon: "circle",
            radius: ["35%", "55%"],
            center: ["48%", "55%"],
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            data: chartData,
            label: {},
            labelLine: {
              show: true,
            },
          },
        ],
      },
      true
    );
  }

  //监听resize
  initResizeEvent() {
    window.addEventListener("resize", this.resizeHandler);
  }

  //移除resize
  destroyResizeEvent() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  render() {
    return (
      <div
        style={{ width: "100%", height: "300px" }}
        ref={(pieChart) => (this.pieChart = pieChart)}
      />
    );
  }
}

export default PieChart;
