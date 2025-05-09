import { Connections, UserConnections } from "../models/user-connections.model";

export async function fetchUserConnections(user: string) {
  const connections = UserConnections.findOne({ user });
  return connections;
}

export async function addUserConnection({
  user,
  name,
  id,
  flavor,
  favorite,
}: {
  user: string;
  id: string;
  name: string;
  flavor: "ORACLE" | "MONGO" | "KAFKA";
  favorite?: boolean;
}) {
  const connection = new Connections({
    name,
    id,
    flavor,
    favorite,
  });

  const userConnections = await UserConnections.findOne({ user });


  if (!userConnections) {
    console.log("deu ruim");

    try {
      const newUserConnections = new UserConnections({
        user,
        connections: [connection],
      });
      
      const x = await newUserConnections.save();
      console.log(x)
    } catch (err) {
      console.log(err);
    } finally {
      return;
    }
  }

  userConnections.connections.push(connection);
  await userConnections.save();

  return userConnections;
}
