import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Tom" }]);
});

router.post("/", (req, res) => {
  res.json({ ok: true });
});

export default router;
