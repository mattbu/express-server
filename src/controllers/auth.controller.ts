import type { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function signup(req: Request, res: Response) {
  try {
    const { email, password, nickname, phone } = req.body;

    // 최소 검증(원하면 더 엄격하게)
    if (!email || !password || !nickname || !phone) {
        return res.status(400).json({ message: "Missing fields" });
      }
  
      const result = await authService.signup({ email, password, nickname, phone });
      return res.json({ ok: true, ...result });
  } catch (err) {
    return res.status(400).json({
      message: err instanceof Error ? err.message : "Signup failed",
    });
  }
}