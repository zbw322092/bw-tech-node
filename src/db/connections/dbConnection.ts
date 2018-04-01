import { Connection, createConnection, ConnectionOptions } from "typeorm";

export const connectDatabase = async (config: ConnectionOptions) => {
  const connection: Connection = await createConnection(config);
  return connection;
}