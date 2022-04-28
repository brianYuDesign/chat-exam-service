import express, { Router, Request, Response } from "express";
import { chatService } from "../services";

const router: Router = express.Router();

router.get("/:chatId", async (req: Request, res: Response) => {
  const chatId = req.params.chatId;
  const { take = 20, skip = 0 } = req.query;
  const data = await chatService.getChatMessageByChatId(+chatId, +take, +skip);
  res.send(data);
});

export default router;
