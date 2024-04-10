import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

AlertBanner.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.string,
};

export default function AlertBanner({ message, variant }) {
  const alertMessage =
    message || "An unexpected error occurred. Please try again later.";
  const alertVariant = variant || "danger";

  return (
    <Alert
      variant={alertVariant}
      style={{
        backgroundColor: "red",
      }}
    >
      {alertMessage}
    </Alert>
  );
}
