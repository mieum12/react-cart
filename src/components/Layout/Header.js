import { Fragment } from "react";
import headerImage from "../../asset/header2.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Lemon</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      {/* 안에 -가 있어서 ['']로 가져와야한다 */}
      <div className={classes["main-image"]}>
        <img src={headerImage} alt="header!" />
      </div>
    </Fragment>
  );
};

export default Header;
