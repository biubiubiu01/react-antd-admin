import { Component } from "react";
import { debounce } from "@/utils/index";
import PropTypes from "prop-types";
const echarts = require("echarts");

class MoreChart extends Component {
  static propTypes = {
    chartData: PropTypes.array.isRequired,
  };

  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.MoreChart);
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          padding: [5, 10],
        },
        grid: {
          left: 50,
          right: 20,
          bottom: 40,
          top: 55,
        },
        legend: {
          show: true,
        },
        xAxis: [
          {
            type: "category",
            data: chartData.map((item) => item.name),
            axisLine: {
              lineStyle: {
                color: "#cecece",
              },
            },
            axisLabel: {
              color: "#666",
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#cecece",
              },
            },
            axisLabel: {
              color: "#666",
            },
            splitLine: {
              show: true,
            },
          },
        ],
        series: [
          {
            name: "男",
            type: "bar",
            stack: "总量",
            barWidth: 15,
            barGap: "80%",
            itemStyle: {
              color: "#2fbadc",
            },
            data: chartData.map((item) => item.male),
          },
          {
            name: "女",
            type: "bar",
            stack: "总量",
            barWidth: 15,
            barGap: "80%",
            itemStyle: {
              color: "#f67a7b",
            },
            data: chartData.map((item) => item.female),
          },
          {
            name: "总人数",
            type: "line",
            symbolSize: 7,
            symbol: "circle",
            itemStyle: {
              color: "#737bfc",
              barBorderRadius: 0,
            },
            data: chartData.map((item) => item.value),
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
        ref={(MoreChart) => (this.MoreChart = MoreChart)}
      />
    );
  }
}

export default MoreChart;
