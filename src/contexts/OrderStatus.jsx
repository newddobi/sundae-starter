import { createContext, useContext, useState } from "react";

const OrderStatus = createContext();

// OrderStatusProvier 안에 있는지 체크하는 커스텀 훅
export function useOrderStatus() {
  const contextValue = useContext(OrderStatus);

  if (!contextValue) {
    throw new Error(
      "useOrderStatus는 반드시 OrderStatusProvider 안에 있어야 합니다"
    );
  }

  return contextValue;
}

export function OrderStatusProvider(props) {
  // inProgress, review, complete
  const [status, setStatus] = useState("inProgress");

  function updateOrderStatus(newStatus) {
    setStatus(newStatus);
  }

  const value = { status, updateOrderStatus };
  return <OrderStatus.Provider value={value} {...props} />;
}
