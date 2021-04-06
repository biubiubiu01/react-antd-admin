import ActiveLine from "./ActiveLine";
import { Timeline } from "antd";
const { Item } = Timeline;

const dynamicPage = () => {
  const timelineList = [
    {
      title: "细节性不够好...",
      time: "2021-04-07",
      color: "red",
    },
    {
      title: "完成页面第一版",
      time: "2021-04-06",
      color: "green",
    },
    {
      title: "上传代码至github",
      time: "2020-03-22",
      color: "gray",
    },
    {
      title: "创建react-antd-admin",
      time: "2021-03-21",
      color: "gray",
    },
  ];
  return (
    <div className="dynamic-wrapper">
      <div className="active-wrapper">
        <div className="dynamic-title">活跃度统计图</div>
        <ActiveLine />
      </div>
      <div className="timeline-wrapper">
        <div className="dynamic-title">近期动态</div>
        <Timeline
          className="padding24"
          mode="left"
          style={{ marginTop: "35px" }}
        >
          {timelineList.map((item) => {
            return (
              <Item key={item.time} color={item.color}>
                <p>{item.time}</p>
                {item.title}
              </Item>
            );
          })}
        </Timeline>
      </div>
    </div>
  );
};

export default dynamicPage;
