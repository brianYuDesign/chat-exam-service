import userService from "./services/user.service";
import chatService from "./services/chat.service";
import database from "./database";
import logger from "./logger";

const seed = async () => {
  await logger.init();
  await database.init();

  const user1 = await userService.createUser({ name: "user1" });
  const user2 = await userService.createUser({ name: "user2" });
  const user3 = await userService.createUser({ name: "user3" });
  const user4 = await userService.createUser({ name: "user4" });

  await chatService.createChatroom({ userList: [user1, user2] });
  await chatService.createChatroom({ userList: [user1, user3] });
  await chatService.createChatroom({ userList: [user1, user4] });
  await chatService.createChatroom({ userList: [user2, user3] });
  await chatService.createChatroom({ userList: [user2, user4] });
  await chatService.createChatroom({ userList: [user3, user4] });
};

seed().then(() => {
  logger.info({ message: "seed is complete!" });
});
