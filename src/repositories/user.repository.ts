import { FindConditions, getRepository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

const create = async (data: Partial<UserEntity>) => {
  const userRepository = getRepository(UserEntity);
  return userRepository.save(data);
};

const findOneWithChatList = async (queryData: FindConditions<UserEntity>) => {
  const userRepository = getRepository(UserEntity);
  return userRepository.findOne({
    relations: ["chatList"],
    where: queryData,
  });
};

export default { create, findOneWithChatList };
