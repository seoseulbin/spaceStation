import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  font-size: ${({ theme }) => theme.size.rg}px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border: 1px solid #e7e7e7;
  flex-direction: column;
  align-items: center;
  z-index: 99;
`;
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
`;

export const Button = styled.button`
  background-color: white;
  font-size: ${({ theme }) => theme.size.rg}px;
  font-weight: 600;
  border: none;
  border-radius: 7px;
  width: 330px;
  height: 65px;
  margin-bottom: 10px;
  & + & {
    margin-bottom: 20px;
  }
  &:hover {
    background-color: #9c9c9c;
  }
`;
