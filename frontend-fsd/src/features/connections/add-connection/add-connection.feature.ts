import { makeConnection } from "@/shared/test/mock/factories/connections.factory";
import { useAddConnectionMutation } from "./add-connection.mutation";


export const useAddConnection = () => {

  const { mutate } = useAddConnectionMutation()

  const handleAddConnection = () => {

    const newConnection = makeConnection()

    mutate({
      user: 'matheus_frigo',
      favorite: false,
      id: newConnection.id,
      flavor: newConnection.flavor,
      name: newConnection.name 
    })
  };

  return { handleAddConnection };
};