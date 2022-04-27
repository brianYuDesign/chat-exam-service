import { getRepository } from "typeorm";
import { ChatEntity } from "../entities/chat.entity";
import { ChatMessageEntity } from "../entities/chat-message.entity";

const create = (data: any) => {
  const chatRepository = getRepository(ChatEntity);
  return chatRepository.save(data);
};
export default { create };
