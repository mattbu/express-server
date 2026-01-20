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

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // const result = await authService.login({ email, password });
    const { accessToken, refreshToken } = await authService.login({ email, password });

    // 쿠키 세팅은 아래 2)에서 자세히
    setAuthCookies(res, accessToken, refreshToken);

    return res.json({ ok: true });
  } catch (e) {
    return res.status(401).json({
      message: e instanceof Error ? e.message : "Login failed",
    });
  }
}

function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("sb_access_token", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 1000, // 1시간
  });

  res.cookie("sb_refresh_token", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
  });
}