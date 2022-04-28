import { FindConditions, getRepository, In } from "typeorm";
import { ChatEntity } from "../entities/chat.entity";

const create = (data: Partial<ChatEntity>) => {
  const chatRepository = getRepository(ChatEntity);
  return chatRepository.save(data);
};

const update = (id: number, data: Partial<ChatEntity>) => {
  const chatRepository = getRepository(ChatEntity);
  return chatRepository.update(id, data);
};

const findByIdListWithUser = async (idList: number[]) => {
  const chatRepository = getRepository(ChatEntity);
  return chatRepository.find({
    where: { id: In(idList) },
    relations: ["userList"],
  });
};

const findOneByIdWithUser = async (id: number) => {
  const chatRepository = getRepository(ChatEntity);
  return chatRepository.find({
    where: { id },
    relations: ["userList"],
  });
};
export default { create, update, findByIdListWithUser, findOneByIdWithUser };
