import { UserEntity } from "../entities/user.entity";
import { chatRepository, chatMessageRepository } from "../repositories";
import { publisher } from "../pubsub";

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
};

const getChatMessageByChatId = async (chatId: number) => {
  const chatMessageList = await chatMessageRepository.findByChatId(chatId);
  return chatMessageList;
};

export default {
  createChatroom,
  createChatMessage,
  getChatMessageByChatId,
};
