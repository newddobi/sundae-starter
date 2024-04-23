import Button from "react-bootstrap/Button";
import { useOrderStatus } from "../../contexts/OrderStatus";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirm() {
  const { updateOrderStatus } = useOrderStatus();
  const { resetOrder } = useOrderDetails();

  const onCreateNewOrderClick = () => {
    resetOrder();
    updateOrderStatus("inProgress");
  };

  return (
    <div>
      <h2>Thank you!</h2>
      <p>Your order number is {"7777"}</p>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button onClick={onCreateNewOrderClick} variant="primary">
        Create new order
      </Button>
    </div>
  );
}
