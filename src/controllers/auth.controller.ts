import type { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function signup(req: Request, res: Response) {
  const { email, password, nickname, phone } = req.body;

  try {
    const userId = await authService.signup({
      email,
      password,
      nickname,
      phone,
    });

    return res.json({ ok: true, userId });
  } catch (err) {
    return res.status(400).json({
      message: err instanceof Error ? err.message : "Signup failed",
    });
  }
}