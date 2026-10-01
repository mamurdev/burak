import express from "express";
const router = express.Router();
import memberController from "./controllers/members.controller";

router.post("/login", memberController.login);

router.post("/signup", memberController.signup);

export default router;