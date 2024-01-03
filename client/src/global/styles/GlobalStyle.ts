import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../styles/font.css";

const GlobalStyle = createGlobalStyle`
  ${reset}

  // styled-react-modal basestyled을 override하여 수정
  *[class*="baseStyles__BaseModalBackground"] {
    height: 100%;
  }

  body {
    box-sizing:border-box;
    font-family: "NotoSansKR", Arial, Helvetica, sans-serif;

    &::-webkit-scrollbar {
      width: 6px;
      height: 5px;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0);
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.sub};
      border-radius: 6px;
    }
  }
  
  a{
    text-decoration: none;
    color: #000;
  }
`;

export default GlobalStyle;
