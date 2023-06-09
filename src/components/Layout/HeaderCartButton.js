import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        {/* svg코드를 JXS 코드에서도 사용 가능함 */}
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}> 3 </span>
    </button>
  );
};

export default HeaderCartButton;
