import React from "react";

const Products = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (e) => {
    let currentValue = e.target.value;
    updateItemCount(name, currentValue);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:5001/${imagePath}`}
        alt={`${name} product`}
      />
      <form style={{ marginTop: "10px" }}>
        <label htmlFor={name} style={{ textAlign: "right" }}>
          {name}
        </label>
        <input
          id={name}
          style={{ marginLeft: 7 }}
          min="0"
          defaultValue="0"
          name="quantity"
          type="number"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Products;
