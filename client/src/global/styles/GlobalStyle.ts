import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import NotoSansKRRegular from "@/assets/fonts/NotoSansKR-Regular.ttf";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'NotoSansKR';
    src: url(${NotoSansKRRegular}) format('truetype');
  }

  body {
    box-sizing:border-box;
    font-family: NotoSansKR, Arial, Helvetica, sans-serif;
  }
  
  a{
    text-decoration: none;
    color: #000;
  }
`;

export default GlobalStyle;
