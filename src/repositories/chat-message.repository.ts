import { getRepository } from "typeorm";
import { ChatMessageEntity } from "../entities/chat-message.entity";

const create = (data: any) => {
  const chatMessageRepository = getRepository(ChatMessageEntity);
  return chatMessageRepository.save(data);
};
export default { create };
