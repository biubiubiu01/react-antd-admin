import { Component } from "react";
import { connect } from "react-redux";
import OpenMap from "./OpenMap";
import "./style.less";

class OpenLayers extends Component {
  render() {
    const { tagShow } = this.props;
    return (
      <div
        className=" relative"
        style={{
          height: tagShow ? "calc(100vh - 148px)" : "calc(100vh - 102px)",
          width: "100%",
        }}
      >
        <OpenMap />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { tagShow } = state.setting;
  return { tagShow };
};

export default connect(mapStateToProps)(OpenLayers);
