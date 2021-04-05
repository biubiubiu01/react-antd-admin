import { Component } from "react";
import PropTypes from "prop-types";
import { loadModules } from "esri-loader";
import { message } from "antd";

export default class BaseMap extends Component {
  static propTypes = {
    current: PropTypes.string,
  };

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.destroy();
    }
    if (this.basemapGallery) {
      this.basemapGallery.destroy();
    }
    if (this.search) {
      this.search.destroy();
    }
  }

  initMap = () => {
    const options = {
      url: "https://js.arcgis.com/3.34/",
    };
    loadModules(
      [
        "esri/map",
        "esri/dijit/BasemapGallery",
        "esri/dijit/Scalebar",
        "esri/dijit/Search",
        "esri/toolbars/draw",
        "dijit/TitlePane",
        "esri/layers/FeatureLayer",
        "esri/renderers/SimpleRenderer",
        "esri/dijit/Measurement",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
        "dojo/keys",
        "dojo/dom",
        "dojo/domReady!",
      ],
      options
    )
      .then(
        ([
          Map,
          BasemapGallery,
          Scalebar,
          Search,
          Draw,
          FeatureLayer,
          SimpleRenderer,
          Measurement,
          SimpleFillSymbol,
          SimpleLineSymbol,
          Color,
          dom,
          keys,
        ]) => {
          this.map = new Map("mapView", {
            basemap: "satellite",
            center: [114.3, 30.4],
            logo: false, //取消地图默认的logo
            zoom: 15,
            slider: false,
            spatialReference: { wkid: 4326 }, //设置坐标系
          });
          this.map.setMapCursor("pointer"); //设置鼠标在map上时的样式为手型

          //底图切换
          this.basemapGallery = new BasemapGallery(
            {
              showArcGISBasemaps: true,
              map: this.map,
            },
            "basemapGallery"
          );
          this.basemapGallery.startup();

          var scalebar = new Scalebar({
            map: this.map,
            attachTo: "bottom-left",
            scalebarUnit: "dual",
          });
          //显示比例尺
          scalebar.show();

          //查询
          this.search = new Search(
            {
              map: this.map,
            },
            "search"
          );
          this.search.startup();

          var stackedDom = dijit.byId("measurementDiv");
          if (stackedDom) {
            this.measurement = stackedDom;
          } else {
            this.measurement = new esri.dijit.Measurement(
              {
                map: this.map,
                defaultAreaUnit: esri.Units.SQUARE_METERS,
                defaultLengthUnit: esri.Units.METERS,
              },
              document.getElementById("measurementDiv")
            );
          }

          this.measurement.startup();

          this.measurement.on("measure-start", (evt) => {
            message.info("双击结束测量");
          });

          this.map.on("load", () => {
            this.tb = new Draw(this.map);
            this.props.sendMap(this.map, this.tb);
          });
        }
      )
      .catch((err) => {
        console.log(err);
        message.error("arcgis 加载出错");
      });
  };

  render() {
    const { current } = this.props;
    return (
      <div className="all-container relative" id="mapView">
        <div className={`mapList ${current == "toggle" ? "show" : "none"}`}>
          <div className="scrollCss mapGallery">
            <div id="basemapGallery"></div>
          </div>
        </div>
        <div
          className={`mapList measure ${
            current == "distance" ? "show" : "none"
          }`}
        >
          <div id="measurementDiv"></div>
        </div>
        <div id="search"></div>
      </div>
    );
  }
}
