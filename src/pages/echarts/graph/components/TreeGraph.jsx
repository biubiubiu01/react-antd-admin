import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class TreeGraph extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.TreeGraph);
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
          show: false,
        },
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 1600,
              edgeLength: 200,
            },
            roam: true,
            draggable: true,
            symbolSize: 80,
            emphasis: { focus: "adjacency" },
            edgeLabel: {
              show: true,
              fontSize: 16,
              formatter(x) {
                return x.data.name;
              },
            },
            edgeSymbol: ["", "arrow"],
            label: {
              show: false,
            },
            itemStyle: {
              shadowColor: "rgba(133,203,247,0.75)",
              shadowBlur: 15,
            },
            label: {
              show: false,
            },
            links: [
              {
                source: "娜美",
                target: "路飞",
                name: "航海士",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "索隆",
                target: "路飞",
                name: "剑士",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "乌索普",
                target: "路飞",
                name: "狙击手",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "山治",
                target: "路飞",
                name: "厨师",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "乔巴",
                target: "路飞",
                name: "医生",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "罗宾",
                target: "路飞",
                name: "学者",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "弗兰奇",
                target: "路飞",
                name: "修船工",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "布鲁克",
                target: "路飞",
                name: "音乐家",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "甚平",
                target: "路飞",
                name: "掌舵手",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "龙",
                target: "路飞",
                name: "父亲",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "卡普",
                target: "路飞",
                name: "爷爷",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "雷利",
                target: "路飞",
                name: "师傅",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "艾斯",
                target: "路飞",
                name: "哥哥",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "萨博",
                target: "路飞",
                name: "哥哥",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "女帝",
                target: "路飞",
                name: "爱慕",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "罗",
                target: "路飞",
                name: "同盟",
                lineStyle: {
                  color: "#006acc",
                },
              },
              {
                source: "路飞",
                target: "草帽大船团",
                name: "船长",
                lineStyle: {
                  color: "#ff7d18",
                },
              },
            ],
            data: [
              {
                name: "路飞",
                symbolSize: 110,
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70789.gif",
              },
              {
                name: "娜美",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70813.gif",
              },
              {
                name: "索隆",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70823.gif",
              },
              {
                name: "乌索普",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70816.gif",
              },
              {
                name: "山治",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70810.gif",
              },
              {
                name: "乔巴",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/62898.gif",
              },
              {
                name: "罗宾",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70815.gif",
              },
              {
                name: "弗兰奇",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70886.gif",
              },
              {
                name: "布鲁克",
                symbol:
                  "image://" + require("../../../../assets/graph/blk.jpg"),
              },
              {
                name: "甚平",
                symbol:
                  "image://" + require("../../../../assets/graph/shenping.jpg"),
              },
              {
                name: "龙",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70807.gif",
              },
              {
                name: "卡普",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70808.gif",
              },
              {
                name: "雷利",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70878.gif",
              },
              {
                name: "艾斯",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/62719.gif",
              },
              {
                name: "萨博",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70818.gif",
              },
              {
                name: "女帝",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70858.gif",
              },
              {
                name: "罗",
                symbol:
                  "image://" + "http://www.xinziyun.com.cn/img/hex/70859.gif",
              },
              {
                name: "草帽大船团",
                symbol:
                  "image://" + require("../../../../assets/graph/big.jpg"),
              },
            ],
          },
        ],
        animationDurationUpdate: (index) => {
          return index * 100;
        },
        animationEasingUpdate: "bounceIn",
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
        ref={(TreeGraph) => (this.TreeGraph = TreeGraph)}
      />
    );
  }
}

export default TreeGraph;
