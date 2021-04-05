import { DatePicker } from "antd";
import BoxShow from "@/components/BoxShow/index";
import { SmileOutlined } from "@ant-design/icons";
import { useState } from "react";
const { RangePicker } = DatePicker;
const timeOption = [
  {
    label: "今日",
    key: "day",
  },
  {
    label: "本周",
    key: "week",
  },
  {
    label: "本月",
    key: "month",
  },
  {
    label: "本年",
    key: "year",
  },
  {
    label: "时间段",
    key: "range",
  },
];

const SaleTitle = (props) => {
  const [currentType, setType] = useState("day");
  return (
    <div className="sale-title flex justify-between">
      {props.children}
      <div className="sale-time">
        {timeOption.map((item) => {
          return (
            <span
              className={`time-item pointer ${
                currentType === item.key ? "activeTime" : ""
              }`}
              key={item.key}
              onClick={() => {
                if (item.key === currentType) {
                  return;
                }
                setType(item.key);
                if (item.key == "range") return;
                props.sendCurrent(item.key);
              }}
            >
              {item.label}
            </span>
          );
        })}
        <BoxShow show={currentType === "range"}>
          <RangePicker
            style={{ width: "250px", marginLeft: "10px" }}
            placeholder={["开始日期", "结束日期"]}
            suffixIcon={<SmileOutlined />}
          ></RangePicker>
        </BoxShow>
      </div>
    </div>
  );
};

export default SaleTitle;
