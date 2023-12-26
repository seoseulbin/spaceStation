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
  return (
    <S.PreviewContainer href={url.ogURL} target="_blank">
      <S.MetaImageContainer>
        <img src={url.ogImage} />
      </S.MetaImageContainer>
      <S.MetaDataContainer>
        <h3>{url.ogTitle}</h3>
        <p>{url.ogDescription}</p>
        <span>{url.ogURL}</span>
      </S.MetaDataContainer>
    </S.PreviewContainer>
  );
}
