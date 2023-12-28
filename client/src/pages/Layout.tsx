import Navbar from "@/components/Navbar/Navbar";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

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
      <StyledInnerLayout>
        <Outlet />
        <Navbar />
      </StyledInnerLayout>
    </>
  );
};

export default Layout;
