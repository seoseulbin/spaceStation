import { PATH } from "@/global/constants";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdHome } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Fragment } from "react";

const items = [
  {
    path: PATH.root,
    activeIcon: <MdHome size={25} />,
    defaultIcon: <MdHome size={25} color={"gray"} />,
    text: "메인",
  },
  {
    path: PATH.createFeed,
    activeIcon: <FaPlus size={25} />,
    defaultIcon: <FaPlus size={25} color={"gray"} />,
    text: "업로드",
  },
  {
    path: PATH.profile,
    activeIcon: <CgProfile size={25} />,
    defaultIcon: <CgProfile size={25} color={"gray"} />,
    text: "마이페이지",
  },
];

export default function Navbar() {
  return (
    <>
      <Container>
        {items.map(({ path, activeIcon, defaultIcon, text }, i) => (
          <Fragment key={"nav" + i}>
            <NavLink to={path}>
              {({ isActive }) => (
                <>
                  <LinkWrrapper $isActive={isActive}>
                    {isActive ? activeIcon : defaultIcon}
                    <div>{text}</div>
                  </LinkWrrapper>
                </>
              )}
            </NavLink>
          </Fragment>
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.deepback};
  width: 100%;
  height: 3rem;
  display: flex;
  padding: 10px;
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
