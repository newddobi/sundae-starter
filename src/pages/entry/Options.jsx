import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import AlertBanner from "../common/AlertBanner";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

Options.propTypes = {
  optionType: PropTypes.string,
};

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    // create an abortController to attach to network request
    // AbortController는 프로세스를 처리할 수 있는 JavaScript 객체
    const controller = new AbortController();
    axios
      .get(`http://localhost:3030/${optionType}`, {
        // axios 호출에서 컨트롤러를 확인하고 있다, 컨트롤러를 중단하면 axios 호출이 중단된다.
        signal: controller.signal,
      })
      .then((response) => setItems(response.data))
      .catch(() => {
        setError(true);
      });

    // 테스트가 끝나는 것과, 네트워크 호출 후 렌더링 하는 작업의 race condition을 막기위해
    // 컴포넌트 언마운트시 axios 호출을 중단한다.
    return () => {
      // console.log("Unmount");
      // controller.abort();
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
