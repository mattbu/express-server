import { supabaseAdmin } from "../lib/supabaseAdmin";
import { prisma } from "../lib/prisma";

export type SignupInput = {
  email: string;
  password: string;
  nickname: string;
  phone: string;
};

export async function signup(input: SignupInput): Promise<string> {
  const { email, password, nickname, phone } = input;

  // 1) Supabase Auth 계정 생성
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    throw new Error(error?.message ?? "Signup failed");
  }

  // 2) Prisma로 프로필 저장
  await prisma.profile.create({
    data: {
      id: data.user.id,
      nickname,
      phone,
    },
  });

  // service는 "결과"만 반환
  return data.user.id;
}