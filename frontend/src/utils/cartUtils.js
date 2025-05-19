export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // cal items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0)
  );

  // cal shipping price :- if items price is greater than 100 then shipping is free else 10
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // cal tax price 15%
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // cal total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
