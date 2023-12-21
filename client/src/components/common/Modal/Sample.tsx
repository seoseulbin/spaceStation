import Login from "@/components/Login/Login";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCustomDialog } from "../hooks/useCustomDialog";
import * as S from "../hooks/useCustomDialog.styles";
import { PATH } from "@/global/constants";

export function SampleModal() {
  const {
    BasicModalLayout,
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  } = useCustomDialog();

  return (
    <>
      <button onClick={toggleDialog}>모달 호출하기</button>
      <S.BasicModal
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        beforeClose={beforeCloseDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
        children={
          <BasicModalLayout
            title="모달 타이틀"
            description="description props로 할당한 모달 설명 글입니다."
          >
            <p>
              레이아웃 템플릿에 지정된 내용 외에도, 엘리먼트 또는 컴포넌트를
              직접 추가하여 내용 표시도 가능합니다.
            </p>
            <p>
              모달 콘텐츠 영역에 표시될 내용이 길어질 경우 세로 스크롤을
              노출하여 모두 확인할 수 있도록합니다.
            </p>
            <Login />
          </BasicModalLayout>
        }
      ></S.BasicModal>
    </>
  );
}

export function SampleDialog() {
  const {
    ActionSheetLayout,
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  } = useCustomDialog();

  const navigate = useNavigate();

  const options = [
    {
      name: "NEUTRAL 메뉴 버튼 (main으로 이동)",
      usage: "NEUTRAL",
      onClick: () => navigate(PATH.root),
    },
    {
      name: "POSITIVE 메뉴 버튼입니다.",
      usage: "POSITIVE",
      onClick: () => {
        toast.success("옵션2을 클릭했습니다.");
        toggleDialog();
      },
    },
    {
      name: "ALERT 메뉴 버튼입니다.",
      usage: "ALERT",
      onClick: () => alert("옵션3을 클릭했습니다."),
    },
  ];

  return (
    <>
      <button onClick={toggleDialog}>액션 시트 호출하기</button>
      <S.ActionSheet
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        beforeClose={beforeCloseDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
        length={options?.length}
        children={<ActionSheetLayout options={options} />}
      ></S.ActionSheet>
    </>
  );
}

export function SampleConfirm() {
  const {
    ConfirmPopupLayout,
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  } = useCustomDialog();

  const buttons = [
    {
      name: "NEUTRAL (취소)",
      usage: "NEUTRAL",
      onClick: () => toggleDialog(),
    },
    {
      name: "ALERT (삭제하는 버튼)",
      usage: "ALERT",
      onClick: () => {
        toast.success("성공적으로 삭제되었습니다.");
        toggleDialog();
      },
    },
  ];
  return (
    <>
      <button onClick={toggleDialog}>컨펌 팝업 호출하기 (버튼만)</button>
      <S.ConfirmPopup
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        beforeClose={beforeCloseDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
        children={
          <ConfirmPopupLayout
            description="변경된 정보를 저장할까요?"
            buttons={buttons}
          ></ConfirmPopupLayout>
        }
      ></S.ConfirmPopup>
    </>
  );
}

export function SampleConfirmWithInput() {
  const {
    ConfirmPopupLayout,
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  } = useCustomDialog();

  const buttons = [
    {
      name: "NEUTRAL (취소)",
      usage: "NEUTRAL",
      onClick: () => toggleDialog(),
    },
    {
      name: "SUBMIT (입력된 정보 저장)",
      usage: "SUBMIT",
      onClick: () => {
        toast.success("성공적으로 저장했습니다.");
        toggleDialog();
      },
    },
  ];
  return (
    <>
      <button onClick={toggleDialog}>
        컨펌 팝업 호출하기 (입력 필드 있는 타입)
      </button>
      <S.ConfirmPopup
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        beforeClose={beforeCloseDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
        children={
          <ConfirmPopupLayout
            description="추가할 태그 정보를 입력해주세요."
            buttons={buttons}
          >
            <section>
              <label>태그 이름</label>
              <input
                name="tagName"
                type="text"
                placeholder="이름을 입력해주세요"
              />
            </section>
            <section>
              <label>링크</label>
              <input
                name="tagURL"
                type="text"
                placeholder="URL을 입력해주세요"
              />
            </section>
          </ConfirmPopupLayout>
        }
      ></S.ConfirmPopup>
    </>
  );
}
