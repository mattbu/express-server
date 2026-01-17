import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { getUsers, getUser } from "../controllers/users.controller";

const router = Router();

router.get("/", asyncHandler(getUsers));
router.get("/:id", asyncHandler(getUser));

export default router;
