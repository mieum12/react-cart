import { useState } from "react";
import Header from "./components/Layout/Header";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  //cart modal을 열고 닫을 수 있게 상태 관ㄹ리
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Products />
      </main>
    </CartProvider>
  );
}

export default App;
