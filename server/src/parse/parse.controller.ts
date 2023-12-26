import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
import { load } from "cheerio";

const parseController = {
  getOGdata: asyncHandler(async (req: express.Request, res: Response) => {
    const url = req.query.url; // 요청 파라미터에서 크롤링할 URL을 가져옴

    const response = await fetch(url as string);
    const html = await response.text();
    const $ = load(html);

    const ogTitle = $('meta[property="og:title"]').attr("content");
    const ogURL = $('meta[property="og:url"]').attr("content");
    const ogImage = $('meta[property="og:image"]').attr("content");
    const ogDescription = $('meta[property="og:description"]').attr("content");

    res.json({ ogTitle, ogURL, ogImage, ogDescription });
  }),
};

export default parseController;
