import { Spin } from "antd";

const Loading = () => (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      zIndex: 99,
    }}
  >
    <Spin size="large" />
  </div>
);

export default Loading;
