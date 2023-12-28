import UserModel from "./user.model.js";
import {
  generateNickname,
  generateRandomProfile,
} from "../utils/randomizeContent.js";

type UserType = {
  nickname: string;
  profileImgUrl: string;
};

const userService = {
  async getUser(_id: string) {
    return UserModel.findOne({ _id });
  },

  async updateUser(_id: string, { nickname, profileImgUrl }: UserType) {
    return UserModel.findOneAndUpdate({ _id }, { nickname, profileImgUrl });
  },

  async searchUsers(snsId: string) {
    return await UserModel.find({ snsId: snsId });
  },
  async signUp(snsId: string) {
    const user = {
      snsId,
      nickname: "",
      profileImgUrl: "",
    };

    if (!user.nickname) user.nickname = generateNickname();
    user.profileImgUrl = generateRandomProfile();

    return await UserModel.create(user);
  },
  async signIn(snsId: string) {
    return await UserModel.findOne({ snsId: snsId });
  },
  async withdrawUser(userId: string) {
    return await UserModel.findOneAndUpdate(
      { _id: userId },
      { deletedAt: new Date() },
      { new: true },
    );
  },
  async revertDeletedUser(snsId: string) {
    return await UserModel.findOneAndUpdate(
      { snsId: snsId },
      { deletedAt: null },
      { new: true },
    );
  },
};

export default userService;
