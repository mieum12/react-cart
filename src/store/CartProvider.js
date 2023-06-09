import { useReducer } from "react";
import CardContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //이미 장바구니에 들어있는 상품 거르기
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //해당 항목이 있는 경우 작동, 존재하지 않으면 existingCartItem은 null
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    //중복된 항목을 카트에 담는 경우
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      //이전 항목을 updatedItem로 덮어쓰기
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //새로운 아이템을 카트에 담을 경우
      updatedItems = state.items.concat(action.item);
    }

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
