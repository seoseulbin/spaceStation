import { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const StylesdLayout = styled.div`
  box-sizing: border-box;
`;

const Layout = ({ children }: LayoutProps) => {
  return <StylesdLayout>{children}</StylesdLayout>;
};

export default Layout;
