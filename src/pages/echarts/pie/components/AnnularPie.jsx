import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class AnnularPie extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.AnnularPie);
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
    this.myChart.setOption(
      {
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: true,
          left: "15",
          top: 0,
          type: "scroll",
          itemWidth: 18,
          itemHeight: 11,
          data: ["生产", "销售", "售后", "评价"],
        },
        series: [
          {
            name: "生产",
            type: "pie",
            radius: ["63%", "70%"],
            center: ["50%", "53%"],
            color: "#4FD8FF",

            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            emphasis: {
              scale: false,
            },
            data: [
              {
                value: 85,
                name: "生产",
              },
              {
                value: 15,
                name: "",
                itemStyle: {
                  color: "#dedede",
                },
                tooltip: {
                  show: false,
                },
              },
            ],
          },
          {
            name: "销售",
            type: "pie",
            emphasis: {
              scale: false,
            },
            radius: ["51%", "58%"],
            center: ["50%", "53%"],
            color: "#C15FFF",
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 75,
                name: "销售",
              },
              {
                value: 25,
                name: "",
                itemStyle: {
                  color: "#dedede",
                },
                emphasis: {
                  scale: false,
                },
                tooltip: {
                  show: false,
                },
              },
            ],
          },
          {
            name: "售后",
            type: "pie",
            emphasis: {
              scale: false,
            },
            radius: ["39%", "46%"],
            center: ["50%", "53%"],
            color: "#FF5F55",
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 65,
                name: "售后",
              },
              {
                value: 35,
                name: "",
                itemStyle: {
                  color: "#dedede",
                },
                emphasis: {
                  scale: false,
                },
                tooltip: {
                  show: false,
                },
              },
            ],
          },
          {
            name: "评价",
            type: "pie",
            emphasis: {
              scale: false,
            },
            radius: ["27%", "34%"],
            center: ["50%", "53%"],
            color: "#FFC935",
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 65,
                name: "评价",
              },
              {
                value: 35,
                name: "",
                itemStyle: {
                  color: "#dedede",
                },
                emphasis: {
                  scale: false,
                },
                tooltip: {
                  show: false,
                },
              },
            ],
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
        ref={(AnnularPie) => (this.AnnularPie = AnnularPie)}
      />
    );
  }
}

export default AnnularPie;
