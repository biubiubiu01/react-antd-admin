import { Rate, Tag } from "antd";

const menu1 = () => {
  return (
    <div className="menu1">
      <div>
        嵌套菜单1 <Rate value={3} style={{ marginLeft: "10px" }} />
      </div>
      <Tag color="#2db7f5">嵌套菜单1</Tag>
    </div>
  );
};

export default menu1;
