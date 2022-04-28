import { UserEntity } from "../entities/user.entity";
import { chatRepository, chatMessageRepository } from "../repositories";
import { publisher } from "../pubsub";
import { redis } from "../cache";

const createChatroom = async (data: { userList: UserEntity[] }) => {
  await chatRepository.create(data);
};

const createChatMessage = async (data: {
  chatId: number;
  userId: number;
  content: string;
}) => {
  const chatMessage = await chatMessageRepository.create(data);
  await chatRepository.update(data.chatId, { lastMessage: chatMessage });
  await publisher.publish("CREATE_MESSAGE", JSON.stringify(chatMessage));
  await redis.set(
    `chatMessage:${data.chatId}`,
    JSON.stringify(chatMessage),
    "EX",
    1000 * 60 * 30
  );
};

const getChatMessageByChatId = async (
  chatId: number,
  take?: number,
  skip?: number
) => {
  const chatMessageList = await chatMessageRepository.findByChatId(
    chatId,
    take,
    skip
  );
  return chatMessageList;
};

export default {
  createChatroom,
  createChatMessage,
  getChatMessageByChatId,
};
