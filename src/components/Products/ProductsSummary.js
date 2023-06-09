import classes from "./ProductsSummary.module.css";

const ProductsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Love your colors!</h2>
      <p>레몬은 표현할 수 있는 모든 색을 사랑합니다.</p>
      <p>
        우리가 보고 사용할 수 있는 물건에 레몬만의 취향, 감성, 색깔을 담아
        따듯함을 표현하고 공유하려고 합니다.
      </p>
      <p>레몬만의 이야기를 담아 만든 제품에 행복함과 따뜻함을 느껴보세요.</p>
    </section>
  );
};

export default ProductsSummary;
