// import ImageAnchorButton from "./ImageAnchorButton";
// import { useCustomDialog } from "../hooks/useCustomDialog";
// import * as S from "../hooks/useCustomDialog.styles";
// import { useEffect } from "react";

// export default function ImageAnchorTagButtonList({
//   imgList,
//   current,
//   successEvent,
// }:{
//   imgList: Array<{
//     url: string;
//     tagPosition: {
//       x: number;
//       y: number;
//     }[];
//     tagInfo: {
//       name: string;
//       url: string;
//     }[];
//   }>;
//   current: string;
//   successEvent? : (e: React.BaseSyntheticEvent) => void;
// }) {

//   const {
//     ConfirmPopupLayout,
//     toggleDialog,
//     afterOpenDialog,
//     beforeCloseDialog,
//     opacity,
//     isOpen,
//   } = useCustomDialog();

//   const buttons = [
//     {
//       name: "취소",
//       usage: "NEUTRAL",
//       onClick: () => toggleDialog(),
//     },
//     {
//       name: "태그 추가",
//       usage: "SUBMIT",
//       onClick: () => successEvent,
//     },
//   ];

//   const currentImage = imgList.find((item) => item.url === current);

//   useEffect(()=> {
//     console.log(currentImage);
//   },[currentImage]);

//   return (
//     <>
//       {currentImage?.tagPosition.map((item, index) => {
//         <ImageAnchorButton
//           key={index}
//           x={item.x}
//           y={item.y}
//           onClick={() => toggleDialog()}
//         />;
//         <S.ConfirmPopup
//           isOpen={isOpen}
//           afterOpen={afterOpenDialog}
//           beforeClose={beforeCloseDialog}
//           onBackgroundClick={toggleDialog}
//           onEscapeKeydown={toggleDialog}
//           opacity={opacity}
//           backgroundProps={{ opacity }}
//           children={
//             <ConfirmPopupLayout
//               description="추가할 태그 정보를 입력해주세요."
//               buttons={buttons}
//             >
//               <section>
//                 <label>태그 이름</label>
//                 <input
//                   name="tagName"
//                   type="text"
//                   placeholder="이름을 입력해주세요"
//                 />
//               </section>
//               <section>
//                 <label>링크</label>
//                 <input
//                   name="tagURL"
//                   type="text"
//                   placeholder="URL을 입력해주세요"
//                 />
//               </section>
//             </ConfirmPopupLayout>
//           }
//         />
//       })}
//     </>
//   )
// }
