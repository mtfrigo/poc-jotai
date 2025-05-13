import { api } from "@/shared/api";
import {AddPanelRequestParams  } from "../query/oracle.params";

export const addPanel = async ({ user, name,  id, config  }: AddPanelRequestParams) => {
    const res = await  api.post(`/console/${user}/oracle/${id}`, {
      name, 
    }, {
      ...config,
    });

    return res.data;
}