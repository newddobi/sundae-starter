import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";
import { useOrderStatus } from "../../contexts/OrderStatus";

export default function OrderEntry() {
  const { totals } = useOrderDetails();
  const { updateOrderStatus } = useOrderStatus();

  const onOrderNowClick = () => {
    updateOrderStatus("review");
  };

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button onClick={onOrderNowClick} variant="primary">
        Order Now
      </Button>
    </div>
  );
}
