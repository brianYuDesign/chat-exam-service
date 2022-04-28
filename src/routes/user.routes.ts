import express, { Router, Request, Response } from "express";
import { userService } from "../services";

const router: Router = express.Router();

router.get("/:username", async (req: Request, res: Response) => {
  const username = req.params.username;
  const data = (await userService.getByName(username)) as any;
  res.send(data);
});

export default router;
