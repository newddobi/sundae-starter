import PropTypes from "prop-types";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useOrderDetails } from "../../contexts/OrderDetails";

ScoopOption.propTypes = {
  name: PropTypes.string,
  imagePath: PropTypes.string,
};

export default function ScoopOption({ name, imagePath }) {
  const [validated, setValidated] = useState(false);

  const { updateItemCount } = useOrderDetails();

  // 음수, 소수점, 10보다 큰 값은 유효하지 않은 값이다
  const handleChange = (e) => {
    const valueToNumber = +e.target.value;

    if (
      Number.isInteger(valueToNumber) &&
      valueToNumber >= 0 &&
      valueToNumber < 11
    ) {
      setValidated(false);
      updateItemCount(name, valueToNumber, "scoops");
    } else {
      setValidated(true);
      updateItemCount(name, 0, "scoops");
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={validated}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
