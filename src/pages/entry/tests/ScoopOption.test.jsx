import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";
import userEvent from "@testing-library/user-event";

test("유효하지 않은 스쿱 값이 입력될 때 입력간을 빨갛게 만든다", async () => {
  // 유저와 앱을 렌더링한다
  const user = userEvent.setup();
  render(<ScoopOption />);

  // 음수, 소수점, 10보다 큰 값은 유효하지 않은 값이다
  const vanillaInput = await screen.findByRole("spinbutton");

  // 스쿱에 음수를 설정한다
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // 스쿱에 소수점을 설정한다
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0.1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // 10보다 큰 값을 설정한다
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "20");
  expect(vanillaInput).toHaveClass("is-invalid");

  // 유효하지 않은값 설정 이후 유효한 값을 설정한다.
  // 우리는 유효성 검사 규칙을 테스트하는 것이 목적이지 react-bootstrap의 기능을 테스트 하는 것이 아니다.
  // 미묘한 차이지만 기억해두자
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
