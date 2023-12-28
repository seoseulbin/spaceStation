import { PATH } from "@/global/constants";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Fragment } from "react";

const items = [
  {
    path: PATH.root,
    activeIcon: <img src="/main.png" />,
    defaultIcon: <img src="/main.png" style={{ filter: "grayscale(1)" }} />,
    text: "메인",
  },
  {
    path: PATH.createFeed,
    activeIcon: <img src="/upload.png" />,
    defaultIcon: <img src="/upload.png" style={{ filter: "grayscale(1)" }} />,
    text: "업로드",
  },
  {
    path: PATH.profile,
    activeIcon: <img src="/mypage.png" />,
    defaultIcon: <img src="/mypage.png" style={{ filter: "grayscale(1)" }} />,
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
  height: 3.2rem;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  font-size: ${({ theme }) => theme.size.sm}px;
  max-width: ${({ theme }) => theme.size.maxWidth}px;
`;

const LinkWrrapper = styled.div<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 100%;
  gap: 0.225rem;
  color: ${({ $isActive }) =>
    $isActive ? ({ theme }) => theme.colors.main : "gray"};

  & img {
    width: 15px;
    width: 25px;
  }
`;
