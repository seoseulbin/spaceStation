import UserModel from "../user/user.model.js";

type searchProps = {
    id: string;
  };

const authService = {
  async searchUsers (id:searchProps) {
    return await UserModel.find({ snsId : id });
  },
};

export default authService;