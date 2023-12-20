import { PATH } from "@/global/constants";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdHome } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  return (
    <>
      <Container>
        <NavLink to={PATH.root}>
          {({ isActive }) => (
            <>
              <LinkWrrapper $isActive={isActive}>
                {isActive ? (
                  <MdHome size={25} />
                ) : (
                  <MdHome size={25} color="gray" />
                )}
                <div>메인</div>
              </LinkWrrapper>
            </>
          )}
        </NavLink>
        <NavLink to={PATH.createFeed}>
          {({ isActive }) => (
            <>
              <LinkWrrapper $isActive={isActive}>
                {isActive ? (
                  <FaPlus size={25} />
                ) : (
                  <FaPlus size={25} color="gray" />
                )}
                <div>업로드</div>
              </LinkWrrapper>
            </>
          )}
        </NavLink>
        <NavLink to={PATH.profile}>
          {({ isActive }) => (
            <>
              <LinkWrrapper $isActive={isActive}>
                {isActive ? (
                  <CgProfile size={25} />
                ) : (
                  <CgProfile size={25} color="gray" />
                )}
                <div>마이페이지</div>
              </LinkWrrapper>
            </>
          )}
        </NavLink>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: ${({ theme }) => theme.size.rg}px;
`;

const LinkWrrapper = styled.div<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 100%;
  gap: 0.125rem;
  color: ${({ $isActive }) => ($isActive ? "black" : "gray")};
`;
