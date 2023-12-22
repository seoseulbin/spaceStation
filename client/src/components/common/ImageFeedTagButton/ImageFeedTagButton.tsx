import * as S from "../ImageAnchorButton/ImageAnchorButton.styles";

export default function ImageFeedTagButton({
  x,
  y,
  index,
  currentImage,
}: {
  x: number;
  y: number;
  currentImage: {
    url: string;
    tagPosition: {
      x: number;
      y: number;
    }[];
    tagInfo: {
      name: string;
      url: string;
    }[];
  };
  index: string;
}) {
  return (
    <>
      <S.AnchorButton
        data-disabled={
          currentImage.tagInfo[parseInt(index)].url ? "" : "disabled"
        }
        title={index}
        x={x}
        y={y}
        onClick={(e: React.BaseSyntheticEvent) => {
          const targetUrl = currentImage.tagInfo[parseInt(index)].url;
          console.log(e.target.title, targetUrl);
          window.open(targetUrl, "_blank");
        }}
      />
    </>
  );
}
