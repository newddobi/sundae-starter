// import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { describe, expect, test } from "vitest";
import OrderEntry from "../OrderEntry";

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
  test("grand total starts at $0.00", () => {
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    // unmount 호출 후 Options의 클린업 함수에서 네트워크 호출 중단 로직 실행
    // 이 모든 과정은 테스트 함수가 종료되기 전에 처리되기 때문에, act에 감싸지 않았다는 오류가 발생하지 않는다.
    unmount();
  });

  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });

    // 바닐라 1스쿱 추가
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    // Question: clear는 매번 해줘야할까?
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");

    // Cherries 토핑 추가
    // "Vanilla"에서 await를 붙였더라도 여기서 또 붙여줘야 한다.
    // 둘은 서로 다른 Axios 호출이라 어느 쪽이 먼저 도착할지 모른다.
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("3.50");
  });

  // scree.debug()를 사용하면 테스트 결과에 해당 시점의 화면, 즉 DOM이 출력된다. debug()는 특정 요소를 찾거나 찾지 못하는 이유를 파악할 때 유용하다
  // logRoles를 이용해서 DOM에 있는 역할들을 볼 수 있다.
  // const { container } = render(<App/>);
  // logRoles(container)
  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });

    // Cherries 토핑 추가
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("1.50");

    // 바닐라 1스쿱 추가
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });

    // 바닐라 2스쿱 추가
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    // grand total은 4.00, 위의 테스트에서 이미 검증했기 때문에 예상은 하되 단언은 하지 않는다.

    // Cherries 토핑 추가
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);

    // 바닐라 1스쿱 제거
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");
  });
});
