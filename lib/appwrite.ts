import { CreateUserParams, SignInParams, User } from "@/type";
import {
  Account,
  AppwriteException,
  Avatars,
  Client,
  Databases,
  ID,
  Models,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  Platform: "com.rasoi",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "6a09ecbf0019d7ab7a3b",
  userCollectionId: "user",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.Platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatar = new Avatars(client);

type AuthenticatedAccount = Models.User<Models.Preferences>;

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const isMissingAccountScopeError = (error: unknown) =>
  error instanceof AppwriteException &&
  error.code === 401 &&
  error.message.includes('missing scopes (["account"])');

const isActiveSessionError = (error: unknown) =>
  error instanceof AppwriteException &&
  error.message.includes("session is active");

export const getCurrentAccount = async (): Promise<AuthenticatedAccount | null> => {
  try {
    return await account.get();
  } catch (error) {
    if (isMissingAccountScopeError(error)) return null;

    throw new Error(getErrorMessage(error, "Failed to fetch current account"));
  }
};

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw new Error();

    await signIn({ email, password });

    const avatarUrl = await avatar.getInitials(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        password,
        avatar: avatarUrl,
      },
    );
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to create user"));
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const currentAccount = await getCurrentAccount();

    if (currentAccount) {
      if (normalizeEmail(currentAccount.email) === normalizeEmail(email)) {
        return await account.getSession("current");
      }

      throw new Error(
        `You are already signed in as ${currentAccount.email}. Please log out before signing in to another account.`,
      );
    }

    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    if (isActiveSessionError(error)) {
      const currentAccount = await getCurrentAccount();

      if (currentAccount && normalizeEmail(currentAccount.email) === normalizeEmail(email)) {
        return await account.getSession("current");
      }
    }

    throw new Error(getErrorMessage(error, "Failed to sign in"));
  }
};

export const getCurrentUser = async (accountId?: string): Promise<User | null> => {
  try {
    const currentAccount = accountId
      ? { $id: accountId }
      : await getCurrentAccount();

    if (!currentAccount) return null;

    const currentUser = await databases.listDocuments<User>(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser.documents.length) return null;

    return currentUser.documents[0];
  } catch (error) {
    if (isMissingAccountScopeError(error)) return null;

    throw new Error(getErrorMessage(error, "Failed to fetch current user"));
  }
};
