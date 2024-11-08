import { Client, Databases, Storage, Messaging, Users } from "node-appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
  .setKey(process.env.NEXT_PUBLIC_API_KEY!);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const messaging = new Messaging(client);
export const users = new Users(client);

