import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";

export const WelcomeTextContainer = withStyles({
    root: {
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        cursor: "pointer",
    },
})(Box);
