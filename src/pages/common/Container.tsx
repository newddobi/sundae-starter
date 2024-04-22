import React from "react";
import { useOrderStatus } from "../../contexts/OrderStatus";
import OrderConfirm from "../confirm/OrderConfirm";
import OrderEntry from "../entry/OrderEntry";
import OrderSummary from "../summary/OrderSummary";

function Container() {
  const { status } = useOrderStatus();

  const getCurrentProcess = () => {
    if (status === "inProgress") {
      return <OrderEntry />;
    } else if (status === "review") {
      return <OrderSummary />;
    } else if (status === "complete") {
      return <OrderConfirm />;
    }
  };

  return <div>{getCurrentProcess()}</div>;
}

export default Container;
