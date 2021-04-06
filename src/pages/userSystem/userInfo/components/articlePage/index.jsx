import { List, Tag, Button } from "antd";
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Component } from "react";

export default class articlePage extends Component {
  state = {
    data: [
      {
        title: "一. vue keep-alive踩坑，删除keep-alive缓存",
        url: "https://juejin.im/post/6844903982301708302",
        tagList: [
          {
            title: "Vue",
            color: "#1890FF",
          },
          {
            title: "keep-alive",
            color: "#52C41A",
          },
        ],
        star: 75,
        like: 23,
        message: 15,
        time: "2019-10-28",
        description:
          "使用keep-alive的时候，有时候会遇到切换了账号后还是上一个的页面的keep-alive，由于vue没有对应的方法去清除keep-alive，所以我们可以强制删除vnode里面的keepAlive属性，达到想要的效果。",
      },
      {
        title: "二. Echarts+Amap实现点击下钻功能",
        url: "https://juejin.im/post/6844903982377205768",
        tagList: [
          {
            title: "Vue",
            color: "#1890FF",
          },
          {
            title: "Echarts",
            color: "#1890FF",
          },
          {
            title: "点击下钻",
            color: "#1890FF",
          },
          {
            title: "AMap",
            color: "#52C41A",
          },
        ],
        star: 28,
        like: 125,
        message: 96,
        time: "2019-10-28",
        description:
          "为了不用在本地下载市县的geoJson,所以使用AMap的api方法获取行政区的geoJson，然后再通过Echarts渲染，达到点击下钻的效果。",
      },
      {
        title: "三. 在Vue项目中使用TypeScript",
        url: "https://juejin.im/post/6844904164015734798",
        tagList: [
          {
            title: "Vue",
            color: "#1890FF",
          },
          {
            title: "类型声明",
            color: "#1890FF",
          },
          {
            title: "ESLint",
            color: "#1890FF",
          },
          {
            title: "TypeScript",
            color: "#52C41A",
          },
        ],
        star: 75,
        like: 145,
        message: 195,
        time: "2020-05-20",
        description:
          "TypeScript初体验，并在vue中实践，值类型声明和全面添加ESLint。",
      },
      {
        title: "四. 使用webpack从0开始搭建vue项目",
        url: "https://juejin.im/post/6844904183150149639",
        tagList: [
          {
            title: "Vue",
            color: "#1890FF",
          },
          {
            title: "不同环境",
            color: "#1890FF",
          },
          {
            title: "从0开始",
            color: "#1890FF",
          },
          {
            title: "webpack",
            color: "#52C41A",
          },
        ],
        star: 125,
        like: 286,
        message: 143,
        time: "2020-06-08",
        description:
          "webpack从0开始搭建，包含各种loader和插件，区分生成和开发环境，优化dll和g-zip等。",
      },
      {
        title: "五. 使用vue3.0全新api开发可视化系统",
        url: "https://juejin.im/post/6870392360946106382",
        tagList: [
          {
            title: "Vue3.0",
            color: "#1890FF",
          },
          {
            title: "Echarts",
            color: "#1890FF",
          },
          {
            title: "全新方法",
            color: "#1890FF",
          },
        ],
        star: 246,
        like: 526,
        message: 63,
        time: "2020-09-09",
        description:
          "采用vue3.0全新api，开发可视化系统，包含所有echarts各种图表。",
      },
    ],
    loadingMore: false,
  };

  loadMore = () => {
    this.setState({
      loadingMore: true,
    });
    const data = [...this.state.data];
    let temp = this.state.data.concat(data.reverse());
    this.setState({
      data: temp,
    });
    setTimeout(() => {
      this.setState({
        loadingMore: false,
      });
    }, 350);
  };
  render() {
    const { data, loadingMore } = this.state;
    return (
      <div className="article-wrapper">
        <List
          itemLayout="vertical"
          dataSource={data}
          size="large"
          renderItem={(item, index) => (
            <List.Item
              key={index}
              actions={[
                <span>
                  <StarOutlined />
                  {item.star}
                </span>,
                <span>
                  <LikeOutlined />
                  {item.like}
                </span>,
                <span>
                  <MessageOutlined />
                  {item.message}
                </span>,
              ]}
            >
              <List.Item.Meta
                title={
                  <a
                    href={item.url}
                    target="_blank"
                    style={{ fontSize: "1rem" }}
                  >
                    {item.title}
                  </a>
                }
                description={
                  <div className="listDescription">
                    {item.tagList.map((tag) => {
                      return (
                        <Tag
                          key={tag.title}
                          style={{ marginBottom: "6px" }}
                          color={tag.color}
                        >
                          {tag.title}
                        </Tag>
                      );
                    })}
                    {item.time}
                    <div style={{ margin: "7px 0 5px" }}>
                      {item.description}
                    </div>
                  </div>
                }
              ></List.Item.Meta>
            </List.Item>
          )}
          footer={
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <Button onClick={this.loadMore} loading={loadingMore}>
                加载更多
              </Button>
            </div>
          }
        ></List>
      </div>
    );
  }
}
