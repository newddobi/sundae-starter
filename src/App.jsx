import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { OrderStatusProvider } from "./contexts/OrderStatus";
import Container from "./pages/common/Container";

function App() {
  return (
    <>
      <OrderStatusProvider>
        <OrderDetailsProvider>
          <Container />
        </OrderDetailsProvider>
      </OrderStatusProvider>
    </>
  );
}

export default App;
