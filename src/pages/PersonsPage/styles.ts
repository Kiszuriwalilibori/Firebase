import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const userCardStyles = {
    root: {
        maxWidth: 300,
        position: "fixed",
        right: "1vw",
        top: "1vh",
        backgroundColor: "#1E656D",
        color: "white",
        border: "1px solid",
        cursor: "default !important",
    },
    media: {
        height: 60,
        width: 60,
        margin: "12px auto 0 auto",
        backgroundSize: "contain",
        color: "white",
        backgroundColor: "#1f9a73",
    },
};

export const LinkButton = withStyles({
    root: {
        transition: "0.5s ease-in-out",
        textTransform: "none",
        fontSize: 16,
        padding: "6px 12px",
        border: "1px solid",
        minWidth: "225px",
        lineHeight: 1.5,
        backgroundColor: "#1E656D",
        color: "white",
        borderColor: "303f4f",
        margin: "10px 0",
        boxShadow:
            "0 0 1px rgba(0,0,0,0.1), 0 0 2px rgba(0,0,0, 0.1), 0 0 4px rgba(0,0,0,0.1), 0 0 8px rgba(0,0,0,0.1),0 0 16px rgba(0,0,0,0.1)",

        "&:hover": {
            backgroundColor: "white",
            color: "#1E656D",
            borderColor: "#303f4f",
        },
        "&:active": {
            boxShadow: "none",
            backgroundColor: "white",
            color: "#1E656D",
            borderColor: "#303f4f",
        },
        "&:focus": {
            outline: "2px ridge #0ca4f6",
            outlineOffset: "1px",
            zIndex: 2000,
        },
        "&:disabled": {
            backgroundColor: "#474747",
            color: "#e0e0e0;",
            boxShadow: "none",
            border: "none",
            cursor: "none",
        },
    },
})(Button);
