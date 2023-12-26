import { FiAlertTriangle } from "react-icons/fi";
import * as S from "./UrlPreview.styles";

export default function UrlPreview({
  url,
}: {
  url: {
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    ogURL: string;
  };
}) {
  const { ogTitle, ogDescription, ogImage, ogURL } = url;
  return (
    <>
      {ogURL == undefined ? (
        <S.NoPreview>
          <FiAlertTriangle />
          <span>URL 미리보기 정보를 받아오지 못했습니다.</span>
        </S.NoPreview>
      ) : (
        <S.PreviewContainer href={ogURL} target="_blank">
          <S.MetaImageContainer>
            <img src={ogImage} />
          </S.MetaImageContainer>
          <S.MetaDataContainer>
            <h3>{ogTitle}</h3>
            <p>{ogDescription}</p>
            <span>{ogURL}</span>
          </S.MetaDataContainer>
        </S.PreviewContainer>
      )}
    </>
  );
}
