import z from "zod";
import {apiRequest} from "./index";

type LoginType = z.infer<typeof LoginParams>;
const LoginParams = z.object({
  username: z.string(),
  password: z.string(),
});

export async function login(body: LoginType) {
  return apiRequest({url: "entry/login", method: "POST", schema: LoginParams, body});
}

type RegisterType = z.infer<typeof LoginParams>;
export const RegisterParams = z.object({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export async function register(body: RegisterType) {
  return apiRequest({url: "entry/register", method: "POST", schema: RegisterParams, body});
}
