import { render } from "@testing-library/react";
import { OrderContextProvider } from "./contexts/OrderContext";

const customRender = (ui, options) => {
  render(ui, { wrapper: OrderContextProvider, ...options });
};

// 테스팅라이브러리에서 제공하는 모든것을 export
export * from "@testing-library/react";

export { customRender as render };
// 만든 customRende를 render이라는 이름으로 내보낸다.
