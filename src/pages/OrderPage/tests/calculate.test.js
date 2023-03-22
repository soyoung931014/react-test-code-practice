import { render, screen } from "../../../test.utils";
import userEvent from "@testing-library/user-event";
import Type from "../Type";
import OrderPage from "../OrderPage";

test("update product's total when products change", async () => {
  const event = userEvent.setup();
  render(<Type orderType="products" />);

  const productsTotal = screen.getByText("총 가격:", { exact: false });
  expect(productsTotal).toHaveTextContent("0");

  //아메리카 여행 상품 한 개 올리기
  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });

  await event.clear(americaInput);
  await event.type(americaInput, "1");
  expect(productsTotal).toHaveTextContent("1000");
});

test("update option's total when options change", async () => {
  const event = userEvent.setup();
  render(<Type orderType="options" />);

  const optionsTotal = screen.getByText("총 가격:", { exact: false });
  expect(optionsTotal).toHaveTextContent("0");

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  await event.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent("500");

  const dinnerCheckbox = await screen.findByRole("checkbox", {
    name: "Dinner",
  });
  await event.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("1000");

  await event.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("500");
});

describe("total price of goods and options", () => {
  const event = userEvent.setup();
  test("total price starts with 0 and Updating total price when adding one product", async () => {
    render(<OrderPage />);

    const total = screen.getByText("Total Price:", { exact: false });
    expect(total).toHaveTextContent("0");

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    await event.clear(americaInput);
    await event.type(americaInput, "1");

    expect(total).toHaveTextContent("1000");
  });

  test("Updating total price when adding one option", async () => {
    render(<OrderPage />);
    const total = screen.getByText("Total Price:", { exact: false });

    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    await event.click(insuranceCheckbox);
    expect(total).toHaveTextContent("500");
  });

  test("Updating total price when removing option and product", async () => {
    render(<OrderPage />);
    const total = screen.getByText("Total Price:", { exact: false });

    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    await event.click(insuranceCheckbox);

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    await event.clear(americaInput);
    await event.type(americaInput, "3");

    await event.clear(americaInput);
    await event.type(americaInput, "1");

    expect(total).toHaveTextContent("1500");
  });
});
