// import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../test-utils/testing-library-utils";
import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";
import userEvent from "@testing-library/user-event";

test("handle error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole("alert");

  expect(alerts).toHaveLength(2);
});

test("한 스쿱 이상 주문되지 않는 경우 주문 버튼을 비활성화 한다", async () => {
  const user = userEvent.setup();
  render(<OrderEntry />);

  const orderNowButton = screen.getByRole("button", {
    name: /Order Now/i,
  });
  const grandTotal = screen.getByText("Grand total: $", {
    exact: false,
  });
  // 아이스크립 스쿱을 추가한다
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  expect(orderNowButton).toBeDisabled();
  expect(grandTotal).toHaveContent("0.00");

  await user.type(vanillaInput, "1");
  expect(orderNowButton).toBeEnabled();
  expect(grandTotal).toHaveContent("2.00");

  await user.type(vanillaInput, "0");
  expect(orderNowButton).toBeDisabled();
  expect(grandTotal).toHaveContent("0.00");
});
