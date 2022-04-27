import { getRepository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

const create = (data: { name: string }) => {
  const userRepository = getRepository(UserEntity);
  return userRepository.save({ name: "test" });
};

export default { create };
