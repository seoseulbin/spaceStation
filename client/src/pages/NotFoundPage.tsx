import styled from "styled-components";

const StylesdLayout = styled.div`
  max-width: ${({ theme }) => theme.size.maxWidth}px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.deepback};
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const NotFoundImg = styled.img`
  width: 25vw;
  position: fixed;
  max-width: 180px;
`;

export default function NotFoundPage() {
  return (
    <>
      <StylesdLayout>
        <NotFoundImg src="../notfound.png" />
      </StylesdLayout>
    </>
  );
}
