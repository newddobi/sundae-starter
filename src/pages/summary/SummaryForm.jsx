import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useOrderStatus } from "../../contexts/OrderStatus";

export default function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);
  const { updateOrderStatus } = useOrderStatus();

  const onConfirmOrderClick = (event) => {
    event.preventDefault();
    updateOrderStatus("complete");
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        onClick={onConfirmOrderClick}
        variant="primary"
        type="submit"
        disabled={!tcChecked}
      >
        Confirm order
      </Button>
    </Form>
  );
}
