import { styled } from "styled-components";

export const PreviewContainer = styled.a`
  display: flex;
  width: auto;
  border-radius: 4px;
  box-shadow: 0 0px 2px 1px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  overflow: hidden;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.2s ease-out;

  &:hover {
    box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.2);
  }
`;

export const MetaImageContainer = styled.div`
  width: 100px;
  height: auto;
  font-size: 0;
  background-color: ${({ theme }) => theme.colors.deepback};

  & img {
    width: inherit;
    object-fit: cover;
    height: 100%;
  }
`;

export const MetaDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: ${({ theme }) => theme.size.sm}px;
  line-height: 1.05em;
  width: calc(100% - 100px);
  box-sizing: border-box;

  & p {
    -webkit-line-clamp: 3;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${({ theme }) => theme.size.sm}px;
    -webkit-box-orient: vertical;
    color: ${({ theme }) => theme.colors.textDisable};
  }
  & span {
    font-size: ${({ theme }) => theme.size.sm}px;
    color: ${({ theme }) => theme.colors.sub};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & h3 {
    font-weight: 700;
    line-height: 1.5em;
    font-size: ${({ theme }) => theme.size.md}px;
    color: ${({ theme }) => theme.colors.textPrimary};
    word-break: keep-all;
    word-wrap: break-word;
  }
`;

export const NoPreview = styled.span`
  padding: 1.5em 0 2em;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.sub};

  & svg {
    height: 32px;
    width: 32px;
  }
`;
