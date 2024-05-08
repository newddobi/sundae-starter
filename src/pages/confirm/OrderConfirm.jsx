import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { useOrderStatus } from "../../contexts/OrderStatus";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirm() {
  const { updateOrderStatus } = useOrderStatus();
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  const onCreateNewOrderClick = () => {
    resetOrder();
    updateOrderStatus("inProgress");
  };

  const newOrderButton = (
    <Button onClick={onCreateNewOrderClick} variant="primary">
      Create new order
    </Button>
  );

  if (error) {
    return (
      <>
        <AlertBanner />
        {newOrderButton}
      </>
    );
  }

  if (orderNumber) {
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
  } else {
    return <div>Loading</div>;
  }
}
