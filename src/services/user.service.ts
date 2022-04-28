import { In } from "typeorm";
import { chatRepository, userRepository } from "../repositories";
const createUser = async (data: { name: string }) => {
  return await userRepository.create(data);
};

const getByName = async (name: string) => {
  const user = (await userRepository.findOneWithChatList({ name })) as any;
  const chatIdList = user?.chatList.map((item: any) => item.id);

  const dbChatList = await chatRepository.findByIdListWithUser(chatIdList);
  const chatList = dbChatList.map((item: any) => {
    return {
      ...item,
      client: item.userList.find((iuser: any) => iuser.id !== user.id),
    };
  });
  console.log(chatList);
  return { ...user, chatList } || [];
};

export default { createUser, getByName };
