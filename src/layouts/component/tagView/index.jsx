import { Component } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addTag, removeTag } from "@/store/modules/tagView";
import SvgIcon from "@/components/SvgIcon/index";
import BoxShow from "@/components/BoxShow/index";
import "./tagView.less";

class TagView extends Component {
  state = {
    hanldeBtn: false,
    tagBodyLeft: 0,
  };

  componentDidMount() {
    this.initTag();
    this.changeTagWidth();
  }

  initTag() {
    const path = this.props.location.pathname;
    this.props.addTag(path);
  }

  handleScroll(val) {
    // const scrollOuterWidth = this.scrollOuter.offsetWidth
    // const scrollBodyWidth = this.scrollBody.offsetWidth
    // if (val > 0) {
    //   this.setState({
    //     tagBodyLeft: Math.min(0, this.tagBodyLeft + val),
    //   })
    // } else {
    //   this.setState({
    //     tagBodyLeft: Math.max(
    //       this.tagBodyLeft + val,
    //       scrollOuterWidth - scrollBodyWidth
    //     ),
    //   })
    // }
  }

  closeTag(path) {
    this.props.removeTag(path);
    // this.$store.dispatch('tagsView/removeTag', path).then(data => {
    //   if (this.isActive(path)) {
    //     this.$router.push({
    //       path: data[data.length - 1].path
    //     });
    //   }
    //   this.changeTagWidth();
    //   this.moveToTag();
    // });
  }

  changeTagWidth() {
    const scrollOuterWidth = this.scrollOuter.offsetWidth;
    const scrollBodyWidth = this.scrollBody.offsetWidth;
    if (scrollBodyWidth >= scrollOuterWidth - 50) {
      this.setState({
        hanldeBtn: true,
      });
    } else {
      this.setState({
        hanldeBtn: false,
      });
    }
  }

  isActive(path) {
    return path == this.props.location.pathname;
  }

  render() {
    const { tagList } = this.props;
    return (
      <div className="tagView-wrapper relative white">
        <LeftOutlined
          className={`absolute pointer tag_btn ${
            this.state.hanldeBtn ? "show" : "none"
          }`}
          style={{ left: 0 }}
          onClick={this.handleScroll(240)}
        />
        <div
          className="scroll-outer"
          ref={(scrollOuter) => (this.scrollOuter = scrollOuter)}
          style={{
            left: this.state.hanldeBtn ? "30px" : "15px",
            right: this.state.hanldeBtn ? "34px" : "15px",
          }}
        >
          <div
            className="scroll-body absolute"
            ref={(scrollBody) => (this.scrollBody = scrollBody)}
            style={{ left: this.state.tagBodyLeft + "px" }}
          >
            {tagList.map((item, index) => {
              return (
                <Link
                  className={`tag-item pointer inline-block ${
                    this.isActive(item.path) ? "activeTag" : ""
                  }`}
                  to={item.path}
                  key={item.path}
                  ref={(tagWrapper) => (this.tagWrapper = tagWrapper)}
                >
                  <span className="tag-title">{item.name}</span>
                  <BoxShow show={index != 0}>
                    <SvgIcon
                      icon="close"
                      className="tag-icon"
                      size={14}
                      onClick={this.closeTag(item.path)}
                    />
                  </BoxShow>
                </Link>
              );
            })}
          </div>
        </div>
        <RightOutlined
          className={`absolute pointer tag_btn ${
            this.state.hanldeBtn ? "show" : "none"
          }`}
          style={{ right: 0 }}
          onClick={this.handleScroll(-240)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { tagList } = state.tagView;
  return { tagList };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTag: (path) => {
      dispatch(addTag(path));
    },
    removeTag: (path) => {
      dispatch(removeTag(path));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TagView)
);
