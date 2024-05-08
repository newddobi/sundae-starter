// import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType={"scoops"} />);

  // find images
  const scoopImages = await screen.findAllByRole("img", {
    name: /scoop$/i,
  });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType={"toppings"} />);

  // find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("스쿱에 유효하지 않은 숫자가 입력됐을 때 스쿱의 소계가 업데이트되지 않도록 한다", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"scoops"} />);

  // 10보다 큰 값을 설정한다
  const vanillaInput = await screen.findByRole("spinbutton");
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "20");

  // 총합이 $0.00인지 확인
  const scoopsTotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsTotal).toHaveTextContent("0.00");
});
