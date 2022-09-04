import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import { Button, Divider, notification, Space } from "antd";
import React from "react";
const Context = React.createContext({ name: "Default" });

const Notification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };

  return (
    <div>
      <Context.Provider
        value={{
          name: "Ant Design",
        }}
      >
        {contextHolder}
        <Space>
          <Button type="primary" onClick={() => openNotification("topLeft")}>
            <RadiusUpleftOutlined />
            topLeft
          </Button>
          <Button type="primary" onClick={() => openNotification("topRight")}>
            <RadiusUprightOutlined />
            topRight
          </Button>
        </Space>
        <Divider />
        <Space>
          <Button type="primary" onClick={() => openNotification("bottomLeft")}>
            <RadiusBottomleftOutlined />
            bottomLeft
          </Button>
          <Button
            type="primary"
            onClick={() => openNotification("bottomRight")}
          >
            <RadiusBottomrightOutlined />
            bottomRight
          </Button>
        </Space>
      </Context.Provider>
    </div>
  );
};

export default Notification;
