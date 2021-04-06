import { Rate, Tag } from "antd";

const menu2 = () => {
  return (
    <div className="menu1">
      <div>
        嵌套菜单2 <Rate value={2} style={{ marginLeft: "10px" }} />
      </div>
      <Tag color="#2db7f5">嵌套菜单2</Tag>
    </div>
  );
};

export default menu2;
