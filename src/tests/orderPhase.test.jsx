import { render, screen } from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();

  // 앱 렌더링
  // 테스트 끝에 unmount를 이용해 컴포넌트를 명시적으로 언마운트하고 테스트 함수 종료 시까지 반환되지 않은 네트워크 호출에 대한 경쟁 상태를 방지
  const { unmount } = render(<App />);

  // 아이스크림 스쿱과 토핑 추가
  // grandTotal은 totalUpdates 테스트에서 진행했기 때문에 생략
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesCheckbox);

  // 주문 입력 페이지에서 주문 버튼을 찾아 클릭
  const orderNowButton = screen.getByRole("button", {
    name: /Order Now/i,
  });
  await user.click(orderNowButton);

  // 주문 내용을 기반으로 요약 정보가 올바른지 확인
  // Question: 요약정보가 올바른지 확인한다는 것은 스쿱과 토핑을 확인하는 것일까 아니면 총합만 확인하면 될까?
  // -> 헤드라인이 있는지, 스쿱 소계와 토핑 소계는 잘 표시되는지 요약항목이 있는지도 확인한다
  const summaryHeading = screen.getByRole("heading", {
    name: "Order Summary",
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", {
    name: "Scoops: $6.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // 이런식으로 스쿱, 토핑, 요약항목을 검사할수도 있다.
  // const optionItems = screen.getAllByRole("listitem");
  // const optionItemsText = optionItems.map((item) => item.textContent);
  // expect(optionItemsText).toEqual(["1 Vanilla", "2 Chocolate", "Cherries"]);

  // 이용 약관을 수락하고 버튼을 클릭해 주문을 확인
  const termsAndConditionCheckbox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });
  await user.click(termsAndConditionCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /Confirm order/i,
  });
  await user.click(confirmOrderButton);

  // "loading"을 보여준다
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // POST Request 요청이 반환되는 건 비동기 동작이라 await가 필요하다
  const thankYou = await screen.findByRole("heading", {
    name: /Thank you!/i,
  });
  expect(thankYou).toBeInTheDocument();

  // "loading"이 사라진 것을 확인한다
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  // 확인 페이지에서 주문 번호가 있는지 확인
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // 확인 페이지에서 새 주문 버튼 클릭
  const createNewOrderButton = screen.getByRole("button", {
    name: /Create new order/i,
  });
  await user.click(createNewOrderButton);

  // 아이스크림 스쿱과 토핑 소계가 재설정됐는지 마지막으로 확인
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // 스쿱과 토핑의 네트워크 호출 결과에 대해 명시적으로 await를 하지 않아서 "not wrapped in act()"나 "unmounted component"오류가 뜰 수 있다. 경쟁상태가 발생할 수 있는 모든 경우를 방지하고자 unmount();로 컴포넌트를 명시적으로 언마운트 한다.
  // 컴퓨터의 속도나 다른 조건 때문에 경쟁 상태가 발생하지 않을 수도 있다. 하지만 우리가 명시적으로 await하지 않은 네트워크의 호출의 결과를 기다리고 있다는 것을 알고 있으니 습관적으로 unmount()를 해 클린없 함수를 작동시키는 게 좋다.
  unmount();
});
