import { getFullEnv } from "../env/configs";

export function sanitizeStr(s: string): string {
  const clean = !s || typeof s !== "string" ? "" : s.trim().normalize();
  return clean;
}

const env = getFullEnv();
console.log(env);
