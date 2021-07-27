import { createGlobalStyle } from "styled-components"

export const lightTheme = {
    textColor: "#fff",
    background: "#000"
};
  
export const darkTheme = {
    textColor: "#000",
    background: "#fff"
};

const Global = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.background};
        transition: all 200ms;
        color: ${({ theme }) => theme.textColor};
    }
`;

export default Global;