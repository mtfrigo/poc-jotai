import { api } from "@/shared/api";
import { AddConnectionParams } from "../params/user-connections.params";

export const addUserConnection = async ({ user, flavor, name, favorite,  id, config  }: AddConnectionParams) => {
    const res = await  api.post(`/connections/${user}`, {
      flavor, 
      id,
      name, 
      favorite,
      user
    }, {
      ...config,
    });

    return res.data;
}