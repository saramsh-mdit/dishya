import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users";
import { checkHash } from "../../utils/hash";
import { createToken } from "../../utils/token";

const usersSource = AppDataSource.getRepository(Users);

export const isAuthUser = async (email: string, password: string) => {
  try {
    const UserData = await usersSource.findOne({
      where: {
        email,
      },
    });
    if (checkHash(UserData?.password, password)) {
      const dataToSend = {
        _id: UserData?._id,
      };
      const token = createToken(dataToSend);

      return {
        name: UserData.userName,
        email: UserData.email,
        userId: UserData._id,
        token: token,
      };
    } else throw { message: "Unauthorized" };
  } catch (err) {
    throw {
      message: "Unauthorized",
      head: 401,
    };
  }
};
