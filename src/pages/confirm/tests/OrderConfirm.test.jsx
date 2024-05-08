import { HttpResponse, http } from "msw";
import { server } from "../../../mocks/server";
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirm from "../OrderConfirm";

test("주문 제출 오류 발생 시 Alert를 보여준다", async () => {
  server.resetHandlers(
    http.post("http://localhost:3030/order", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderConfirm />);

  // 서버에서 오류 응답이 와야 경고가 표시되기 때문에 await를 붙인다
  const alerts = await screen.findByRole("alert");

  expect(alerts).toHaveTextContent(
    "An unexpected error occurred. Please try again later."
  );
});
