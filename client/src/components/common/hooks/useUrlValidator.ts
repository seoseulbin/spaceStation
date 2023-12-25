//import { useState } from "react";
import toast from "react-hot-toast";

export function useUrlValidator(url: string) {
  if (!url.includes("http://")) {
    toast.error("유효한 URL이 아닙니다.");
  }
}

/*
 * 검증 조건
 *
 * 1) http:// 또는 https:// 가 포함되어 있는지?
 * 2) .{domain} 형태의 텍스트가 포함되어 있는지? 어떤 도메인을 검증할 지?
 * 3) search query가 포함되어 있다면 ?{key}={value} 형식으로 되어 있는지 검증
 */

// 예시 URL : https://ohou.se/advices/8030?affect_type=Home&affect_id=0
