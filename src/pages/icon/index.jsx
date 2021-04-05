import { List } from "antd";
import "./style.less";
import localIcon from "./localIcon";
import SvgIcon from "@/components/SvgIcon/index";
import clipboard from "@/utils/clipboard";
const { Item } = List;

const Icon = () => {
  return (
    <div className="icon-container">
      <List
        grid={{ gutter: 16, column: 6 }}
        dataSource={localIcon}
        renderItem={(item) => (
          <Item>
            <div
              className="text-center pointer icon-wrapper"
              onClick={(e) => handleCopy(item, e)}
            >
              <SvgIcon icon={item} size={30} className="disabled" />
              <div style={{ marginTop: "8px" }}>{item}</div>
            </div>
          </Item>
        )}
      ></List>
    </div>
  );
};

const handleCopy = (item, e) => {
  clipboard(`<SvgIcon icon="${item}" size=${30} />`, e);
};

export default Icon;
