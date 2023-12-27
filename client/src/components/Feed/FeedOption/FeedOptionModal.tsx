import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCustomDialog } from "../../common/hooks/useCustomDialog";
import * as S from "../../common/hooks/useCustomDialog.styles";
import { PATH } from "@/global/constants";
import { HiDotsHorizontal } from "react-icons/hi";
import { storage, storageKeys } from "@/global/storage";
import { useDeleteFeed } from "./FeedOption.hooks";
import { useState } from "react";

export function FeedOptionModal({
  feedId,
  userId,
}: {
  feedId: string;
  userId: string;
}) {
  const {
    ActionSheetLayout,
    ConfirmPopupLayout,
    toggleDialog,
    afterOpenDialog,
    opacity,
    isOpen,
  } = useCustomDialog();

  const [isOpen2, setIsOpen2] = useState(false);
  const [opacity2, setOpacity2] = useState(0);

  const { deleteFeed } = useDeleteFeed();
  const navigate = useNavigate();

  const localUserData = storage.get(storageKeys.currentUser);
  // const currentUser = JSON.parse(localUserData as string);

  function toggleDialog2() {
    setIsOpen2(!isOpen2);
  }
  function afterOpenDialog2() {
    setTimeout(() => {
      setOpacity2(1);
    }, 100);
  }

  function beforeCloseDialog2() {
    return new Promise((resolve) => {
      setOpacity2(0);
      setTimeout(resolve, 350);
    });
  }
  const options = [
    {
      name: "수정",
      usage: "수정",
      onClick: () => navigate(PATH.updateFeed(feedId)),
    },
    {
      name: "삭제",
      usage: "삭제",
      onClick: () => {
        toggleDialog();
        toggleDialog2();
      },
    },
  ];
  const options2 = [
    {
      name: "신고하기",
      usage: "신고하기",
      onClick: async () => {
        toast.success("신고가 완료되었습니다.");
        toggleDialog();
      },
    },
  ];
  const buttons = [
    {
      name: "취소",
      usage: "취소",
      onClick: () => toggleDialog2(),
    },
    {
      name: "확인",
      usage: "확인",
      onClick: async () => {
        await deleteFeed(feedId);
        toggleDialog2();
      },
    },
  ];
  return (
    <>
      <HiDotsHorizontal onClick={toggleDialog} />
      <S.ActionSheet
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
        length={options?.length}
        children={
          <ActionSheetLayout
            options={localUserData?.userId === userId ? options : options2}
          />
        }
      ></S.ActionSheet>

      <S.ConfirmPopup
        isOpen={isOpen2}
        afterOpen={afterOpenDialog2}
        beforeClose={beforeCloseDialog2}
        onBackgroundClick={toggleDialog2}
        onEscapeKeydown={toggleDialog2}
        opacity={opacity2}
        backgroundProps={{ opacity2 }}
        children={
          <ConfirmPopupLayout
            description="피드를 삭제하시겠습니까?"
            buttons={buttons}
          ></ConfirmPopupLayout>
        }
      ></S.ConfirmPopup>
    </>
  );
}
