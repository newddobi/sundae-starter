// import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { describe, expect, test } from "vitest";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // 총합이 $0.00인지 확인
  const scoopsSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // 바닐라 1스쿱 추가하고 총합 확인
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // 초콜릿 2스쿱 추가하고 총합 확인
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when topping change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // 총합이 $0.00인지 확인
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // Cherries 토핑 추가하고 총합 확인
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // M&Ms 토핑이랑 Hot fudge 토핑 추가하고 총합 확인
  // await를 붙일 필요가 없다, "Cherries"를 찾았으니 페이지 데이터가 로딩 됐다는 것을 알기 때문에
  const mmsCheckbox = screen.getByRole("checkbox", {
    name: "M&Ms",
  });
  const hotFudgeCheckbox = screen.getByRole("checkbox", {
    name: "Hot fudge",
  });

  await user.click(mmsCheckbox);
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("4.50");

  // Cherries 토핑 제거하고 총합 확인
  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {});
  test("grand total updates properly if scoop is added first", () => {});
  test("grand total updates properly if topping is added first", () => {});
  test("grand total updates properly if item is removed", () => {});
});
