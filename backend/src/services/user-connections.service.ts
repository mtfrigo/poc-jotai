import { Connections, UserConnections } from "../models/user-connections.model";

export async function fetchUserConnections(user: string) {
  const connections = UserConnections.findOne({ user });
  return connections;
}

export async function addUserConnection({
  user,
  name,
  flavor,
  favorite,
}: {
  user: string;
  name: string;
  flavor: "ORACLE" | "MONGO" | "KAFKA";
  favorite?: boolean;
}) {
  const connection = new Connections({
    name,
    flavor,
    favorite,
  });

  const userConnections = await UserConnections.findOne({ user });

  if (!userConnections) {
    try {
      const newUserConnections = new UserConnections({
        user,
        connections: [connection],
      });
      
      const x = await newUserConnections.save();
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
