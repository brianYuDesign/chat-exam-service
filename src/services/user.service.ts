import userRepository from "../repositories/user.repository";

const createUser = async (data: { name: string }) => {
  return await userRepository.create(data);
};

const getByName = async (name: string) => {
  const user = await userRepository.findOneWithChatList({ name });
  return user || [];
};

export default { createUser, getByName };
