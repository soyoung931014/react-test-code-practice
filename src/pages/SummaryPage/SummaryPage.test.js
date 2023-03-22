import { render, screen } from "@testing-library/react";
import SummaryPage from "./SummaryPage";

test("checkbox and button", () => {
  render(<SummaryPage />);
  const checkbox = screen.getByRole("checkbox", {
    name: "주문하려는것을 확인 하셨나요?",
  });
  expect(checkbox.checked).toEqual(false);

  const confirmButton = screen.getByRole("button", { name: "주문확인" });
  //expect(confirmButton).toBeDisabled();
  expect(confirmButton.disabled).toBeTruthy();
});
