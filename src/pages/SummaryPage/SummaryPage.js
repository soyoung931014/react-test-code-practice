import React, { useContext, useState } from "react";
import { OrderContext } from "../../contexts/OrderContext";

const SummaryPage = ({ setStep }) => {
  const [checked, setChecked] = useState(false);
  const [orderDatas] = useContext(OrderContext);

  const productsArray = Array.from(orderDatas.products);
  const productList = productsArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });
  console.log(Array.from(orderDatas.options.values()));
  const hasOptions = orderDatas.options.size > 0;

  let optionsRender = null;
  if (hasOptions) {
    const optionsArray = Array.from(orderDatas.options.keys());
    const optionList = optionsArray.map((key) => <li key={key}>{key}</li>);
    // hasOptions가 있어야 렌더링 되는것이기 때문에, 렌더링되는 return문에다가 작성해주지 않고
    // 여기에다가 작성해주겠다.
    optionsRender = (
      <>
        <h2>옵션: {orderDatas.totals.options}</h2>
        <ul>{optionList}</ul>
      </>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };
  return (
    <div>
      <h1>주문 확인</h1>
      <h2> 여행 상품: {orderDatas.totals.products}</h2>
      <ul>{productList}</ul>
      {optionsRender}
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          id="confirm-checkbox"
          onChange={(e) => setChecked(e.target.checked)}
          checked={checked}
        />
        <label htmlFor="confirm-checkbox">주문하려는것을 확인 하셨나요?</label>
        <br />
        <button disabled={!checked} type="submit">
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
