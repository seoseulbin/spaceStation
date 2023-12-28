import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
// import NotoSansKRRegular from "@/assets/fonts/NotoSansKR-Regular.ttf";
import "../styles/font.css";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    box-sizing:border-box;
    font-family: 'NotoSansKR', Arial, Helvetica, sans-serif;
  }
  
  a{
    text-decoration: none;
    color: #000;
  }
`;

export default GlobalStyle;
