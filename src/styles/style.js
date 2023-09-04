import styled, { createGlobalStyle } from "styled-components";
import React from "react";

const overheaderColor = "#495F75";
const colorUnamo = "rgb(0, 193, 179)";
const colorSuccess = "#39ff14";
const colorSailorBlue = "#495F75";
const colorMint = "#C2F1DB";
const inputBorderColor = "#C2F1DB";
const circleSize = "30px";
const circleBackground = "#FBEA58";
const circleText = "#5A5D50";
const message = styled.div`margin 0 1rem; color: grey;`;

const btn = styled.button`
    display: inline-block;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid ${colorMint};
    padding: 0.375rem 3rem;
    margin: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    overflow: visible;
    color: ${colorMint};
    background-color: transparent;
    cursor: pointer;
    transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out,
        box-shadow 0.3s ease-in-out;
    &:hover,
    &:focus {
        color: #495f75;
        outline: none;
        background-color: ${colorMint};
        border-color: transparent;
    }
    &:disabled {
        opacity: 0.5;
        cursor: default;
        background-color: transparent;
        &:hover {
            background-color: transparent;
            color: ${colorMint};
            border-color: ${colorMint};
        }
    }
    // &:disabled {
    //     cursor: default;
    //     background-color: #474747;
    //     color: #e0e0e0;
    //     &:hover {
    //         background-color: #474747;
    //         color: #e0e0e0;
    //         border-color: ${colorMint};
    //     }
    // }
`;

const btnDisabled = styled(btn)`
    opacity: 0.5;
    cursor: default;
    &:hover {
        color: gold;
        background-color: transparent;
        border-color: gold;
    }
`;

export const Login = {
    Wrapper: styled.aside`
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        padding: 4vh 0;

        @media (max-width: 568px) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    `,
    page: styled.a.attrs(props => ({
        href: "https://unamo.com/pl/",
        target: "_blank",
        rel: "noopener",
    }))`
        font-size: 1.5rem;
        color: ${colorUnamo};
        font-family: "Lato", sans-serif;
    `,
};
export const PersonsPageHeader = styled.h1`
    font-family: "Lato", sans-serif;
    background-color: ${overheaderColor};
    color: ${colorMint};
    padding: 8px;
    border: 4px solid;
    border-radius: 6px;
`;

export const Overhead = {
    Wrapper: styled.div`
        display: flex;
        min-height: 4.2rem;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: ${overheaderColor};
        border: 0;

        @media (min-width: 569px) {
            flex-direction: row;
        }
    `,

    SuccessMessage: styled(message)`
        color: ${colorSuccess};
    `,
    DangerMessage: styled(message)`
        color: ${circleBackground};
    `,
    Btn: btn,
    BtnDisabled: btnDisabled,
    BtnText: styled.span`
        margin-left: 1rem;
    `,
    IconCheck: () => <span className="IcoMoon">&#xe900;</span>,
    IconCross: () => <span className="IcoMoon">&#xe902;</span>,
    IconLimit: () => <span className="IcoMoon">&#xe901;</span>,
};

export const Input = {
    DangerMessage: styled.span`
        letter-spacing: 0.08rem;
        font-weight: 700;
        cursor: pointer;
        color: ${circleBackground};
    `,
    Input: styled.input`
        border: 0;
        cursor: pointer;
        overflow: visible;
        font-size: 16px;
        padding: 0.3rem;
        background-color: ${colorMint};
        color: ${colorSailorBlue};
    `,
    ResetWrapper: styled.div`
        display: inline;
    `,
    InnerWrapper: styled.div`
        display: inline;
        padding: 0.25rem;
        margin: 0.5rem;
        border-radius: 0.25rem;
        border: 1px solid ${inputBorderColor};
    `,
    InputWrapper: styled.div`
        display: inline;
        padding: 0.25rem;
        margin: 0.5rem;
        border-radius: 0.25rem;
        border: 1px solid ${inputBorderColor};
    `,
    OuterWrapper: styled.form`
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        align-items: center;
        flex-wrap: wrap;
        @media (min-width: 569px) {
            flex-direction: row;
            justify-content: center;
        }
    `,
    Btn: btn,
};

export const Header = {
    Wrapper: styled.thead`
        background-color: ${colorSailorBlue};
        color: ${colorMint};
    `,
    SectionStyle: styled.th`

text-align: left;
@media(max-width: 568px) {padding 0.75rem 0}
@media(min-width: 569px) {padding 0.75rem}

vertical-align:top;
border-top: 1px solid;
&.focusable{cursor: pointer;
  &:hover,&:focus{
  background-color: #3A4C5F;
}}

`,
    Section: props => (
        <Header.SectionStyle
            role={props.focusable ? "button" : ""}
            className={props.focusable ? "icon-Sort focusable" : "icon-Sort"}
            tabIndex={props.focusable ? 0 : -1}
        >
            {props.children}
        </Header.SectionStyle>
    ),
};

export const Rows = {
    EmailCell: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    MiddleAligned: styled.td`
        vertical-align: middle;
        padding: 0.75rem;
        border-top: 1px solid;
    `,
    MiddleAlignedTop: styled.td`
        vertical-align: top;
        padding: 0.75rem;
        border-top: 1px solid;
    `,
    Circle: styled.span`
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
    `,
    button: styled.button.attrs(props => ({ type: "button", "aria-label": "delete" }))`
        background: transparent;
        border-radius: 50%;
        border: none;
    `,
};

export const GlobalStyle = createGlobalStyle`
body {color: gold; 
}; 
* {box-sizing: border-box}

*{@import url('./styles/App.css');

}

html {

  font-size: 12px;
  
  @media 
    (max-width: 330px){ font-size:10px;}
  @media 
    (min-width: 331px)and (max-width: 568px) { font-size:12px;}
     
  @media 
    (min-width: 569px){ font-size:16px;}
  
 

}
`;

export const PersonsPageContainer = styled.div`
    overflow-y: auto;
    display: flex;
    min-height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 20vh;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
`;

export const PersonsTableContainer = styled.main`
    width: 96%;
    border-radius: 0.25rem;
    border: 1px solid #3c5063;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.15),
        0 8px 8px rgba(0, 0, 0, 0.15);
    font-size: 1rem;
    line-height: 1.5;
    font-family: "Lato", sans-serif;
    margin: 1vw 1vw;
    @media (max-width: 569px) {
        font-size: calc(12px + 4 * ((100vw - 320px) / 249));
    }
`;

export const PersonsTableBody = styled.table`
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    box-shadow: inset 0 1px 1px rgba(200, 200, 200, 0.11);

    @media (max-width: 300px) {
        display: block;
    }

    @media (min-width: 569px) {
        overflow-y: visible;
    }
`;

/**
 * todo dangerMessage, successM3essage do usunięcia po zastąpieniu notistackiem
 *
 */
