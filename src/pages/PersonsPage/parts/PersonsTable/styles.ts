import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import ClearRoundedIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

const iconColor = "#FF0801;";
const iconHoverColor = "rgba(247,0,0,0.34)";
const circleSize = "30px";
const circleBackground = "#FBEA58";
const circleText = "#5A5D50";

export const ClearIcon = withStyles({
    root: {
        color: iconColor,
        cursor: "pointer",
    },
})(ClearRoundedIcon);

export const Button = withStyles({
    root: {
        color: iconColor,
        transition: "background-color 0.5s ease-in-out",
        "&:hover": { backgroundColor: iconHoverColor },
    },
})(IconButton);

export const RegularCell = styled.td`
    vertical-align: middle;
    padding: 0.75rem;
    border-top: 1px solid;
`;

export const Circle = styled.span`
    text-shadow: 0 -0.03rem 0.03rem;
    font-weight: 100;
    width: ${circleSize};
    height: ${circleSize};
    color: ${circleText};
    border: 1px solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${circleBackground};
    @media (max-width: 569px) {
        width: calc(20px + 10 * ((100vw - 320px) / 249));
        height: calc(20px + 10 * ((100vw - 320px) / 249));
    }
`;

export const EmailCell = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ErrorMsg = styled.span`
    color: red;
    background-color: white;
    border-radius: 2px;
    padding: 0.5rem;
`;
