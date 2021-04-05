import { Component } from "react";
import { debounce } from "@/utils/index";
import PropTypes from "prop-types";
const echarts = require("echarts");

class LineChart extends Component {
  static propTypes = {
    title: PropTypes.string,
    chartData: PropTypes.object.isRequired,
  };
  static defaultProps = {
    title: "",
  };

  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.lineChart);
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
    const { chartData, title } = this.props;
    const { xData, yData, lastData } = chartData;
    this.myChart.setOption(
      {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
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
            boundaryGap: false,
            data: xData,
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
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [
          {
            name: "本期" + title,
            smooth: true,
            type: "line",
            symbol: "circle",
            showSymbol: false,
            data: yData,
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              color: "#5171fd",
              borderColor: "#fff",
            },
            areaStyle: {
              shadowColor: "rgba(133,203,247,0.75)",
              shadowBlur: 15,
            },
          },
          {
            name: "同期" + title,
            smooth: true,
            type: "line",
            symbol: "circle",
            showSymbol: false,
            data: lastData,
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              color: "#53fcee",
              borderColor: "#fff",
            },
            areaStyle: {},
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
        className="chart-wrapper"
        ref={(lineChart) => (this.lineChart = lineChart)}
      />
    );
  }
}

export default LineChart;
