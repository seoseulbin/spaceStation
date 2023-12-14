import jwt from "jsonwebtoken";
import UserModel from "../../user/user.model.js";

type userType = {
  snsId: string;
  nickname: string | null;
  profileImgUrl: string | null;
};

const userService = {
  async signup ({ snsId, nickname, profileImgUrl = "/profile_default_image.jpeg" }:userType) {
    //return await UserModel.find({ snsId : id });
    const user = { snsId, nickname, profileImgUrl, };

    if(!user.nickname) user.nickname = generateNickname();
      
    return await UserModel.create(user);
  },
};

// 랜덤 닉네임 생성
function generateNickname() {
  const adjectives = ["재빠른", "빠른", "멋진", "신비로운"];
  const nouns = ["도르마무", "고양이", "사자", "호랑이"];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective}${randomNoun}`;
}