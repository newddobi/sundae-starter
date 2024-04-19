import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // 앱 렌더링
  render(<App />);
  const user = userEvent.setup();

  // 아이스크림 스쿱과 토핑 추가
  // grandTotal은 totalUpdates 테스트에서 진행했기 때문에 생략
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

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

  // 이용 약관을 수락하고 버튼을 클릭해 주문을 확인
  // 확인 페이지에서 주문 번호가 있는지 확인
  // 확인 페이지에서 새 주문 버튼 클릭
  // 아이스크림 스쿱과 토핑 소계가 재설정됐는지 마지막으로 확인
});
