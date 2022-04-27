import userRepository from "../repositories/user.repository";

const createUser = async (data: { name: string }) => {
  return await userRepository.create(data);
};

export default { createUser };
