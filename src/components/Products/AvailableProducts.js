import Card from "../UI/Card";
import classes from "./AvailableProducts.module.css";
import ProductItem from "./ProductItem/ProductItem";

const DUMMY_PRODUCTS = [
  {
    id: "m1",
    name: "토끼 인형",
    description: "뽀글뽀글한 토끼 인형입니다",
    price: 10.0,
  },
  {
    id: "m2",
    name: "하트 스퀴져 키링",
    description: "열쇠 모양의 하트 스퀴져이며 키링으로 쓰실 수 있습니다",
    price: 16.5,
  },
  {
    id: "m3",
    name: "바다 유리잔",
    description: "직접 그려넣은 파도 디자인이 특징인 제품입니다",
    price: 12.99,
  },
  {
    id: "m4",
    name: "파스타 플레이트",
    description:
      "넓고 살짝 가운데가 깊게 제작하여 음식을 담아 먹기에 용이하게 제작하였습니다",
    price: 18.99,
  },
];

const AvailableProducts = () => {
  const productsList = DUMMY_PRODUCTS.map((product) => (
    <ProductItem
      id={product.id}
      key={product.id}
      name={product.name}
      description={product.description}
      price={product.price}
    />
  ));
  return (
    <section className={classes.products}>
      <Card>
        <ul>{productsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableProducts;
