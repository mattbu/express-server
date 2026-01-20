import { supabaseAdmin } from "../lib/supabaseAdmin";
import { supabaseClient } from "../lib/supabaseClient";
import { createProfile } from "./profile.service";

export type SignupInput = {
  email: string;
  password: string;
  nickname: string;
  phone: string;
};

export async function signup(input: SignupInput) {
  const { email, password, nickname, phone } = input;

  // 1) Supabase Auth 계정 생성
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // 개발 편의
  });

  if (error || !data.user) {
    throw new Error(error?.message ?? "Signup failed");
  }

  const userId = data.user.id;

  try {
    // 2) Prisma에 프로필 생성 (auth.users.id 그대로)
    await createProfile({ id: userId, nickname, phone });
  } catch (e) {
    // 3) 프로필 생성 실패 시: Auth 계정 롤백(삭제)
    await supabaseAdmin.auth.admin.deleteUser(userId);
    throw e;
  }

  return { userId };
}

export async function login(input: { email: string; password: string }) {
  console.log(supabaseClient,'supabaseClient')
  const { data, error } = await supabaseClient.auth.signInWithPassword(input);

  if (error || !data.session) {
    throw new Error(error?.message ?? "Login failed");
  }

  // access_token / refresh_token 둘 다 필요 (새로고침 유지의 핵심)
  return {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    expiresIn: data.session.expires_in, // seconds
  };
}