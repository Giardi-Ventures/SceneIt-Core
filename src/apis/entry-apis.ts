import z from "zod";
import {apiRequest} from "./index";
import {globalStore, updateAuth} from "../redux";
import {updateUser} from "../redux/user";
import {useRequest} from "../hooks";

export const useLogin = () => useRequest(login);
export type LoginParamsType = z.infer<typeof LoginParams>;
export const LoginParams = z.object({
  username: z.string().min(5),
  password: z.string().min(3),
});

export async function login(body: LoginParamsType) {
  return apiRequest({
    url: "entry/login",
    method: "POST",
    schema: LoginParams,
    body,
    onCallback: (callback) => {
      if (callback.error === null) {
        globalStore.dispatch(updateUser({account: callback.data.account}));
        globalStore.dispatch(updateAuth({token: callback.data.unique}));
      }
    },
  });
}

export type RegisterParamsType = z.infer<typeof RegisterParams>;
export const RegisterParams = z.object({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export async function register(body: RegisterParamsType) {
  return apiRequest({
    url: "entry/register",
    method: "POST",
    schema: RegisterParams,
    body,
  });
}

export async function isLogged() {
  return apiRequest({url: "entry/account", method: "GET"});
}
