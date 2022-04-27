import { UserEntity } from "../entities/user.entity";
import chatRepository from "../repositories/chat.repository";
import chatMessageRepository from "../repositories/chat-message.repository";

const createChatroom = async (data: { userList: UserEntity[] }) => {
  await chatRepository.create(data);
};

const createChatMessage = async (data: any) => {
  await chatMessageRepository.create(data);
};

export default { createChatroom, createChatMessage };
