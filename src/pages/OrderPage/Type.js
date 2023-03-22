import React, { useContext, useEffect, useState } from "react";
import Products from "./Products";
import axios from "axios";
import ErrorBanner from "../../components/ErrorBanner";
import Options from "./Options";
import { OrderContext } from "../../contexts/OrderContext";

const Type = ({ orderType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDatas, updateItemCount] = useContext(OrderContext);
  //console.log(orderDatas);
  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`http://localhost:5001/${orderType}`);
      setItems(response.data);
    } catch (error) {
      //  console.error(error);
      setError(true);
    }
  };
  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }
  let orderTypeKorean = orderType === "products" ? "상품" : "옵션";
  // orderType에 따라 달라지는 아이템컴포넌트
  const ItemComponents = orderType === "products" ? Products : Options;
  const optionItems = items.map((item) => {
    return (
      <ItemComponents
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        updateItemCount={(itemName, newItemCount) =>
          updateItemCount(itemName, newItemCount, orderType)
        }
      />
    );
  });

  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>
        {orderTypeKorean} 총 가격: {orderDatas.totals[orderType]}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" && "column",
        }}
      >
        {optionItems}
      </div>
    </div>
  );
};

export default Type;
