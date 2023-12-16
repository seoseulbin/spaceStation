import UserModel from "./user.model.js";

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
};
export default userService;
