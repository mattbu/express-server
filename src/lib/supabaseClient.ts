import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY! // 서버에서 로그인용(프론트에 공개되는 키지만, 여기선 서버에서 사용)
);

const url = process.env.SUPABASE_URL;
const anon = process.env.SUPABASE_ANON_KEY;

console.log("[supabase env check]", {
  url: url?.slice(0, 30),
  anonLen: anon?.length,
});

if (!url) throw new Error("SUPABASE_URL missing");
if (!anon) throw new Error("SUPABASE_ANON_KEY missing");