import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("From order to order completion", async () => {
  render(<App />);

  const event = userEvent.setup();
  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  await event.clear(americaInput);
  await event.type(americaInput, "2");

  // England 여행 상품 3개 추가합니다.
  const englandInput = await screen.findByRole("spinbutton", {
    name: "England",
  });
  await event.clear(englandInput);
  await event.type(englandInput, "3");

  // insurance 옵션체크

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });

  await event.click(insuranceCheckbox);

  //모든 주문을 한 이후 주문 버튼 클릭!
  const orderButton = screen.getByRole("button", {
    name: "주문",
  });
  await event.click(orderButton);

  //////////   주문확인페이지    ///////
  const summaryHeading = screen.getByRole("heading", { name: "주문 확인" });
  expect(summaryHeading).toBeInTheDocument();

  const productHeading = screen.getByRole("heading", {
    name: "여행 상품: 5000",
  });
  expect(productHeading).toBeInTheDocument();

  const optionsHeading = screen.getByRole("heading", {
    name: "옵션: 500",
  });
  expect(optionsHeading).toBeInTheDocument();

  expect(screen.getByText("2 America")).toBeInTheDocument();
  expect(screen.getByText("3 England")).toBeInTheDocument();
  expect(screen.getByText("Insurance")).toBeInTheDocument();

  const confirmCheckbox = screen.getByRole("checkbox", {
    name: "주문하려는것을 확인 하셨나요?",
  });
  await event.click(confirmCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: "주문 확인",
  });
  await event.click(confirmOrderButton);

  //// 주문 완료 ////
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const completeHeader = await screen.findByRole("heading", {
    name: "주문이 성공했습니다.",
  });
  expect(completeHeader).toBeInTheDocument();

  const loadingDisappeared = screen.queryByText("loading");
  expect(loadingDisappeared).not.toBeInTheDocument();

  const firstPageButton = screen.getByRole("button", {
    name: "첫페이지로",
  });
  event.click(firstPageButton);

  const productsTotal = screen.getByText("상품 총 가격: 0");
  expect(productsTotal).toBeInTheDocument();

  const optionsTotal = screen.getByText("옵션 총 가격: 0");
  expect(optionsTotal).toBeInTheDocument();

  await waitFor(() => {
    screen.getByRole("spinbutton", { name: "America" });
  });
});
