import { Client, Account, ID } from "appwrite";

type userData = {
  userId: string;
  email: string;
  password: string;
  name: string;
};

export const signupUser = ({ userId, email, password, name }: userData) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT || "") // Your API Endpoint
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ""); // Your project ID

    const account = new Account(client);

    const promise = account.create(userId, email, password, name);

    if (!promise) throw new Error("Failed signup.");

    return promise;
  } catch (error: any) {
    throw new Error("Failed signup. " + error?.message);
  }
};
