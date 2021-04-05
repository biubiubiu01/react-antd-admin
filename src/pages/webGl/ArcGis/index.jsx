import { Component } from "react";
import { connect } from "react-redux";
import BoxShow from "@/components/BoxShow/index";
import SvgIcon from "@/components/SvgIcon/index";
import { message } from "antd";
import BaseMap from "./BaseMap";
import "./style.less";

class ArcGisMap extends Component {
  state = {
    currentKey: "",
    map: null,
    tb: null,
  };
  handleList = [
    {
      title: "切换底图",
      icon: "toggle",
    },

    {
      title: "绘制点",
      icon: "multipoint",
    },
    {
      title: "绘制线",
      icon: "line",
    },
    {
      title: "绘制面",
      icon: "extent",
    },
    {
      title: "清除",
      icon: "clear",
    },
    {
      title: "测量",
      icon: "distance",
    },
    {
      title: "打点",
      icon: "addPoint",
    },
    {
      title: "加载地图服务",
      icon: "mapServer",
    },
    {
      title: "轨迹",
      icon: "trajectory",
    },
  ];

  changeHandle = (val) => {
    if (val == "clear") {
      this.state.map.graphics.clear();
      return;
    } else if (val == "trajectory") {
      message.info("功能开发中...");
      return;
    } else if (val == "multipoint" || val == "line" || val == "extent") {
      this.state.tb.activate(val);
      this.state.map.disableMapNavigation();
    } else if (val == "addPoint") {
      this.addPoint();
    } else if (val == "mapServer") {
      this.addMapServer();
    }
    this.setState({
      currentKey: val,
    });
  };

  getMap = (map, tb) => {
    this.setState(
      {
        map: map,
        tb: tb,
      },
      () => {
        this.state.tb.on("draw-end", (evt) => {
          this.state.tb.deactivate();
          this.state.map.enableMapNavigation();
          let symbol = this.getDrawStyle(this.state.currentKey);
          this.state.map.graphics.add(new esri.Graphic(evt.geometry, symbol));
          evt.geometry.setCacheValue("geoShape", this.state.currentKey);
          this.setState({
            currentKey: "",
          });
        });
      }
    );
  };

  addPoint = () => {
    const pointArr = [
      {
        x: 116.413384,
        y: 39.910925,
      },
      {
        x: 117.209523,
        y: 39.093668,
      },
      {
        x: 113.306436,
        y: 40.082469,
      },
      {
        x: 109.787443,
        y: 39.614482,
      },
      {
        x: 123.567539,
        y: 41.849226,
      },
      {
        x: 129.63954,
        y: 44.556246,
      },
      {
        x: 121.480539,
        y: 31.235929,
      },
      {
        x: 121.628572,
        y: 29.866033,
      },
      {
        x: 114.311582,
        y: 30.598467,
      },
      {
        x: 103.679433,
        y: 30.636596,
      },
    ];
    let current = pointArr[parseInt(Math.random(0, 0.9) * 10)];
    let point = new esri.geometry.Point(
      current.x,
      current.y,
      new esri.SpatialReference({ wkid: 4326 })
    );
    let path = require("../../../assets/map/point.png");
    let symbol = new esri.symbol.PictureMarkerSymbol(path.default, 25, 25);
    let graphics = new esri.Graphic(point, symbol, "");
    this.state.map.graphics.add(graphics);
    this.state.map.centerAndZoom(point, 8);
    this.setState({
      currentKey: "",
    });
  };

  addMapServer = () => {
    let mapLayer = new esri.layers.ArcGISDynamicMapServiceLayer(
      "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity_Mobile/MapServer"
    );
    this.state.map.addLayer(mapLayer);
    let point = new esri.geometry.Point(
      116.413384,
      39.910925,
      new esri.SpatialReference({ wkid: 4326 })
    );
    this.state.map.centerAndZoom(point, 4);
  };

  getDrawStyle = (key) => {
    if (key == "multipoint") {
      /* eslint-disable */
      var symbol = new esri.symbol.SimpleMarkerSymbol();
      symbol.setColor(new esri.Color("#00FFFF"));
      return symbol;
    } else if (key == "line") {
      let CartographicLineSymbol = esri.symbol.CartographicLineSymbol;
      return new CartographicLineSymbol(
        CartographicLineSymbol.STYLE_SOLID,
        new esri.Color([255, 0, 0]),
        2,
        CartographicLineSymbol.CAP_ROUND,
        CartographicLineSymbol.JOIN_MITER,
        5
      );
    } else {
      let SimpleFillSymbol = esri.symbol.SimpleFillSymbol;
      let SimpleLineSymbol = esri.symbol.SimpleLineSymbol;
      return new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new esri.Color([255, 0, 0]),
          1
        ),
        new esri.Color([255, 0, 0, 0.1])
      );
    }
  };

  render() {
    const { currentKey, map } = this.state;
    const { handleList } = this;
    const { tagShow } = this.props;
    return (
      <div
        className="arcgis-wrapper relative"
        style={{
          height: tagShow ? "calc(100vh - 148px)" : "calc(100vh - 102px)",
        }}
      >
        <BoxShow show={map != null}>
          <div className="handle-list flex flex-wrap align-content-around">
            {handleList.map((item) => {
              return (
                <div
                  className="handle-item"
                  key={item.icon}
                  title={item.title}
                  onClick={() => this.changeHandle(item.icon)}
                >
                  <SvgIcon
                    icon={item.icon}
                    size={21}
                    color={item.icon == currentKey ? "#fff" : "#cecece"}
                  />
                </div>
              );
            })}
          </div>
        </BoxShow>
        <BaseMap current={currentKey} sendMap={this.getMap} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { tagShow } = state.setting;
  return { tagShow };
};

export default connect(mapStateToProps)(ArcGisMap);
