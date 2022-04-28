import { getRepository } from "typeorm";
import { ChatMessageEntity } from "../entities/chat-message.entity";

const create = async (data: Partial<ChatMessageEntity>) => {
  const chatMessageRepository = getRepository(ChatMessageEntity);
  return await chatMessageRepository.save(data);
};

const findByChatId = async (chatId: number) => {
  const chatMessageRepository = getRepository(ChatMessageEntity);
  return await chatMessageRepository.find({
    where: { chatId },
    order: { createdAt: "DESC" },
  });
};
export default { create, findByChatId };
