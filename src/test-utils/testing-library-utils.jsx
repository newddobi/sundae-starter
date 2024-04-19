import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";
import { OrderStatusProvider } from "../contexts/OrderStatus";

const AllTheProviders = ({ children }) => {
  return (
    <OrderDetailsProvider>
      <OrderStatusProvider>{children}</OrderStatusProvider>
    </OrderDetailsProvider>
  );
};

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
