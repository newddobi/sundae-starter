import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { OrderStatusProvider, useOrderStatus } from "./contexts/OrderStatus";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirm from "./pages/confirm/OrderConfirm";

function App() {
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

  return (
    <Container>
      <OrderStatusProvider>
        <OrderDetailsProvider>{getCurrentProcess}</OrderDetailsProvider>
      </OrderStatusProvider>
    </Container>
  );
}

export default App;
