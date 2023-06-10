import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

//입력값 검증을 위해 비어있는지 번호가 11자리 인지 검증
const isEmpty = (value) => value.trim() === "";
const isElevenChars = (value) => value.trim().length === 11;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    detailAddress: true,
    phone: true,
  });

  //제출을 누를때 한번에 전달하기 위해
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const detailAddressInputRef = useRef();
  const phoneInputRef = useRef();

  const confirmHandler = (event) => {
    //http 요청을 전달할 브라우져 브폴트를 막기, 요청은 전송되지 않게
    event.preventDefault();

    //.current는 ref안에 저장된 실제 값에 대한 접근 = input element을 나타낸다
    const enteredName = nameInputRef.current.value;
    const enteredAdress = addressInputRef.current.value;
    const enteredDetailAddress = detailAddressInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAdressIsValid = !isEmpty(enteredAdress);
    const enteredDetailAddressIsValid = !isEmpty(enteredDetailAddress);
    const enteredPhoneIsValid = isElevenChars(enteredPhone);

    setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredAdressIsValid,
      detailAddress: enteredDetailAddressIsValid,
      phone: enteredPhoneIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAdressIsValid &&
      enteredDetailAddressIsValid &&
      enteredPhoneIsValid;

    //4가지가 전부 true일 때 제출 가능하도록
    //4중에 하나라도 맘ㄴ족을 못하면 제출 불가
    if (!formIsValid) {
      return;
    }

    //우선 카트 컴포넌트로 제출! -> 그 다음 사용자 정보와, 카드 상품 정보를 함께 백엔드로 보낸다
    //cart 컴포넌트 안에서 지정한 Prop이름 =onConfirm
    props.onConfirm({
      name: enteredName,
      address: enteredAdress,
      detailAddress: enteredDetailAddress,
      phone: enteredPhone,
    });
  };

  const addressControlClasses = `${classes.control} ${
    formInputsValidity.address ? "" : classes.invalid
  }`;
  const detailAddressControlClasses = `${classes.control} ${
    formInputsValidity.detailAddress ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputsValidity.phone ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      {/* 1.이렇게 바로 클래스 이름 변경 코드 짜기 */}
      <div
        className={`${classes.control} ${
          formInputsValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">이름</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>유효한 이름을 입력해 주세요!</p>}
      </div>
      {/* 2. 변수로 만들어서 클래스 이름 코드 관리하기 */}
      <div className={addressControlClasses}>
        <label htmlFor="address">주소</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputsValidity.address && <p>유효한 주소를 입력해 주세요!</p>}
      </div>
      <div className={detailAddressControlClasses}>
        <label htmlFor="detail">상세주소</label>
        <input type="text" id="detail" ref={detailAddressInputRef} />
        {!formInputsValidity.detailAddress && (
          <p>유효한 상세주소를 입력해 주세요!</p>
        )}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="phone">연락처( - 제외 ex.01012345678)</label>
        <input type="text" id="phone" ref={phoneInputRef} />
        {!formInputsValidity.phone && (
          <p>유효한 연락처 11자리를 입력해 주세요!</p>
        )}
      </div>

      {/* 취소 버튼은 양식을 제출하지 않게 타입을 버튼으로 지정해준다 */}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
