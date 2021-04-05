import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class SolidPie extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.SolidPie);
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
    const colorList = [
      "#4FD8FF",
      "#C15FFF",
      "#FF5F55",
      "#FFC935",
      "#767BFB",
      "rgb(248,70,102)",
    ];
    this.myChart.setOption(
      {
        color: colorList,
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
          data: ["Vue", "Echarts", "TypeScript", "Webpack", "Node", "jQuery"],
        },
        series: [
          {
            name: "技术占比",
            type: "pie",
            icon: "circle",
            center: ["48%", "55%"],
            radius: "55%",
            data: [
              {
                name: "Vue",
                value: 75,
              },
              {
                name: "Echarts",
                value: 85,
              },
              {
                name: "TypeScript",
                value: 70,
              },
              {
                name: "Webpack",
                value: 75,
              },
              {
                name: "Node",
                value: 45,
              },
              {
                name: "jQuery",
                value: 65,
              },
            ],
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
        className="chart-wrapper"
        ref={(SolidPie) => (this.SolidPie = SolidPie)}
      />
    );
  }
}

export default SolidPie;
