import UserModel from "../user/user.model.js";

const authService = {
  async searchUsers(snsId: string) {
    return await UserModel.find({ snsId: snsId });
  },
};

export default authService;
