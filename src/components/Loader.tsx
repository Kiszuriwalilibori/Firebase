import { memo } from "react";
import Progress from "@mui/material/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

export const CircularProgress = withStyles({
    root: {
        color: "#cfb6a8;",
        position: "fixed",
        display: "block",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
    },
})(Progress);

/**
 * creates memoised spinner that indicates loading state
 * @returns spinner component
 */
const Loader = memo(() => {
    return <CircularProgress thickness={5} size={100} />;
});

export default Loader;
