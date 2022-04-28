import { getRepository } from "typeorm";
import { ChatEntity } from "../entities/chat.entity";

const create = (data: Partial<ChatEntity>) => {
  const chatRepository = getRepository(ChatEntity);
  return chatRepository.save(data);
};

const update = (id: number, data: Partial<ChatEntity>) => {
  const chatRepository = getRepository(ChatEntity);
  return chatRepository.update(id, data);
};
export default { create, update };
