import { useReducer } from "react";
import CardContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // if (action.type === "REMOVE") {
  // }
  return defaultCartState;
};

//cart-context의 데이터를 관리하고, 접근하려는 모든 컴포넌트에 그 데이터를 제공하는 역할을 한다
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CardContext.Provider value={cartContext}>
      {/* 이렇게해서 모든 컴포넌트들을 <CardContext.Provider>로 감쌀 수 있다 */}
      {props.children}
    </CardContext.Provider>
  );
};
export default CartProvider;
