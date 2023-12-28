import Navbar from "@/components/Navbar/Navbar";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const StylesdLayout = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
`;

const StyledInnerLayout = styled.div`
  max-width: ${({ theme }) => theme.size.maxWidth}px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: 50px;
  min-height: 100%;
  box-sizing: border-box;
`;

const Layout = () => {
  return (
    <>
      <StylesdLayout>
        <StyledInnerLayout>
          <Outlet />
          <Navbar />
        </StyledInnerLayout>
      </StylesdLayout>
    </>
  );
};

export default Layout;
