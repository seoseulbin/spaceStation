import { Router } from "express";
import authController from "./auth.controller.js";
import { validateToken } from "../middleware/validation/validateToken.js";
import { load } from "cheerio";

const authRouter = Router();

authRouter.get("/kakao", authController.getKakaoAuthCode);

authRouter.get("/oauth", authController.handleKakaoOAuthProcess);

authRouter.post("/login", authController.handleLogin);

authRouter.post("/join", authController.handleJoin);

authRouter.post("/logout", authController.handleLogout);

authRouter.post("/withdraw", validateToken, authController.handleWithdraw);

authRouter.get("/parse", async (req, res) => {
  try {
    const url = req.query.url; // 요청 파라미터에서 크롤링할 URL을 가져옴

    const response = await fetch(url as string);
    const html = await response.text();
    const $ = load(html);

    const title = $("title").text();
    const ogImage = $('meta[property="og:image"]').attr("content");
    console.log(title, ogImage);

    res.json(html);

    // 크롤링할 데이터 추출
    //   const title = $('title').text();
    //   const ogImage = $('meta[property="og:image"]').attr('content');

    //res.json({ title, ogImage }); // 추출한 데이터를 JSON 형태로 응답
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "크롤링에 실패했습니다." }); // 오류 발생시 에러 응답
  }
});

export default authRouter;
