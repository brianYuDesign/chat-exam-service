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
  await redis.set(`chat:${data.chatId}:lastMessage`, JSON.stringify(data));
  const chatMessage = await chatMessageRepository.create(data);
  await redis.zadd(
    `chat:${data.chatId}`,
    chatMessage.id,
    JSON.stringify(chatMessage)
  );
  await chatRepository.update(data.chatId, { lastMessage: chatMessage });
  await publisher.publish("CREATE_MESSAGE", JSON.stringify(chatMessage));
};

const getChatMessageByChatId = async (
  chatId: number,
  take?: number,
  skip?: number
) => {
  // zrevrange vs zrange
  const redisResult = await redis.zrevrange(`chat:${chatId}`, 0, -1);
  if (redisResult.length > 0 && skip === 0) {
    return redisResult.map((item: string) => JSON.parse(item));
  } else if (redisResult.length === 0) {
    const chatMessageList = await chatMessageRepository.find({
      where: { chatId },
      order: { createdAt: "DESC" },
      take,
      skip,
    });

    if (chatMessageList.length === 0) {
      return [];
    }

    chatMessageList.reverse().forEach((item: any) => {
      redis.zadd(`chat:${chatId}`, item.id, JSON.stringify(item));
    });
    return chatMessageList;
  }
};

export default {
  createChatroom,
  createChatMessage,
  getChatMessageByChatId,
};
