import { Alert } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";

const StyledAlert = withStyles({
  root: {
    background: "#AA1227",
    zIndex: "1000",
    position: "fixed",
    top: "1vw",
    left: "1vh",
    color: "white",
    fontWeight: "bold",
    border: "2px solid #D13525",
    margin: "40px auto",
    maxWidth: "300px",
    boxShadow: "inset 0 0 2px #D13525, 0 1px 1px rgba(0,0,0,0.14), 0 2px 2px rgba(0,0,0,0.14),0 0 4px rgba(0,0,0,0.14),0 0 8px rgba(0,0,0,0.14)",
  },
})(Alert);

export default StyledAlert;
