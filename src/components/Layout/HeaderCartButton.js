import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState();
  const cartCtx = useContext(CartContext);

  //전체가 아니라 items만 의존성으로 전달할 수 있게
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighLighted ? classes.bump : ""
  }`;

  useEffect(() => {
    //0이 아닐때 실행되도록 카트가 0이면 그냥 반환
    if (items.length === 0) {
      return;
    }
    setBtnIsHighLighted(true);

    //class를 삭제해 빈 문자열로 돌려놔야한다, 그래야 추가 할때마다 애니메이션 효과 가능
    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);

    //clean up function : 이 이펙트가 실행 될 때 타이머를 지우도록, 만료되기 전에 다시 설정 가능(여러번 클릭 시 이전 타이머는 지우고 새로운 타이머를 실행해야 하니까)
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        {/* svg코드를 JXS 코드에서도 사용 가능함 */}
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}> {numberOfCartItems} </span>
    </button>
  );
};

export default HeaderCartButton;
