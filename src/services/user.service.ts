import { In } from "typeorm";
import { redis } from "../cache";
import { chatRepository, userRepository } from "../repositories";

const createUser = async (data: { name: string }) => {
  const user = await userRepository.create(data);
  return user;
};

const getByName = async (name: string) => {
  const usernameKey = `user-name:${name}:data`;
  let user = await redis.get(usernameKey);

  if (user) {
    return JSON.parse(user);
  }

  const userData = (await userRepository.findOneWithChatList({ name })) as any;
  const chatIdList = userData?.chatList.map((item: any) => item.id);
  const dbChatList = await chatRepository.findByIdListWithUser(chatIdList);
  const chatList = await Promise.all(
    dbChatList.map(async (item: any) => {
      const lastChatMessage = await redis.get(`chat:${item.id}:lastMessage`);
      return {
        ...item,
        id: item.id,
        lastMessage: lastChatMessage ? JSON.parse(lastChatMessage) : null,
        client: item.userList.find(
          (chatUser: any) => chatUser.id !== userData.id
        ),
      };
    })
  );

  const result = { ...userData, chatList };
  await redis.set(usernameKey, JSON.stringify(result), "EX", 10);

  return result;
};

export default { createUser, getByName };
