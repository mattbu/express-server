import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { signup } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", asyncHandler(signup));

export default router;
