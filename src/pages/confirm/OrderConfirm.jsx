import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderStatus } from "../../contexts/OrderStatus";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { useEffect, useState } from "react";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirm() {
  const { updateOrderStatus } = useOrderStatus();
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.orderNumber))
      .catch((error) => {
        setError(error);
      });
  }, []);

  const onCreateNewOrderClick = () => {
    resetOrder();
    updateOrderStatus("inProgress");
  };

  if (error) {
    return <AlertBanner />;
  }

  return (
    <div>
      <h2>Thank you!</h2>
      <p>Your order number is {orderNumber}</p>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button onClick={onCreateNewOrderClick} variant="primary">
        Create new order
      </Button>
    </div>
  );
}
