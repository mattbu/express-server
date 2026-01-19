import { prisma } from "../lib/prisma";

export async function createProfile(input: {
  id: string;
  nickname: string;
  phone: string;
}) {
  return prisma.profile.create({ data: input });
}