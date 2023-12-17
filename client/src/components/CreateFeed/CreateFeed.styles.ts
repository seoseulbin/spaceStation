import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  font-size: ${({ theme }) => theme.size.md}px;
  max-width: calc(${({ theme }) => theme.size.maxWidth}px - 10px);
  height: 100%;
  margin: 0 auto;
  border: 1px solid #e7e7e7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 350px;
  height: 300px;
  border: 1px solid #b4b4b4;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const FeedImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const ImagePreveiwContainer = styled.form`
  width: 350px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

export const InputImage = styled.input`
  display: none;
`;

export const InputImageButton = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #b4b4b4;
  margin-right: 10px;
`;

export const ImagePreviewWrapper = styled.div`
  display: flex;
  overflow: auto;
`;

export const ImagePreviewList = styled.div`
  position: relative;
  margin-right: 15px;
`;

export const ImagePreview = styled.img`
  width: 75px;
  height: 75px;
`;

export const ImageDeleteButton = styled.button`
  position: absolute;
  right: 0;
`;

export const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.size.md}px;
  margin-bottom: 5px;
`;

export const Textarea = styled.textarea`
  width: 350px;
  height: 100px;
`;

export const CategoryContainer = styled.div`
  width: 350px;
  margin-bottom: 20px;
`;

export const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
  margin-top: 5px;
`;

export const CategoryItem = styled.div<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? "#9c9c9c" : "#d9d9d9")};
  padding: 15px;
  text-align: center;
  cursor: pointer;
`;
