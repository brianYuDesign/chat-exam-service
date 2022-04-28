import { getRepository } from "typeorm";
import { ChatMessageEntity } from "../entities/chat-message.entity";

const create = async (data: Partial<ChatMessageEntity>) => {
  const chatMessageRepository = getRepository(ChatMessageEntity);
  return await chatMessageRepository.save(data);
};

const findByChatId = async (chatId: number, take?: number, skip?: number) => {
  const chatMessageRepository = getRepository(ChatMessageEntity);
  return await chatMessageRepository.find({
    where: { chatId },
    order: { createdAt: "DESC" },
    take: take || 20,
    skip: skip || 0,
  });
};
export default { create, findByChatId };
