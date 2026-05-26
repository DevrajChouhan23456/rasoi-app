import { Category, CreateUserParams, GetMenuParams, MenuItem, SignInParams, User } from "@/type";
import {
  Account,
  AppwriteException,
  Avatars,
  Client,
  Databases,
  ID,
  Models,
  Query,
  Storage
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  Platform: "com.rasoi",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "6a09ecbf0019d7ab7a3b",
  bucketId:"6a101c07001670da4fb8",
  userCollectionId: "user",
  categoriesCollectionId:"categories",
  menuCollectionId:"menu",
  customizationsCollectionId:"customizations",
  menuCustomizationsCollectionId:"menu_customizations",

};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.Platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
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

const isDuplicateUserError = (error: unknown) =>
  error instanceof AppwriteException &&
  error.code === 409 &&
  error.message.includes("already exists");

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
    let accountId: string;

    try {
      const newAccount = await account.create(ID.unique(), email, password, name);
      if (!newAccount) throw new Error("Failed to create account");
      accountId = newAccount.$id;
    } catch (createError) {
      if (!isDuplicateUserError(createError)) {
        throw createError;
      }

      // Auth account already exists — attempt to sign in and recover
      await signIn({ email, password });

      const existingUser = await getCurrentUser();
      if (existingUser) {
        // Fully registered user — direct them to sign in instead
        throw new Error(
          "An account with this email already exists. Please sign in instead.",
        );
      }

      // Orphaned auth account (no user document) — get the account ID and
      // fall through to create the missing document
      const currentAccount = await getCurrentAccount();
      if (!currentAccount) {
        throw new Error("Failed to recover existing account. Please try again.");
      }
      accountId = currentAccount.$id;
    }

    // Ensure we have an active session (no-op if signIn was already called above)
    await signIn({ email, password });

    const avatarUrl = await avatar.getInitials(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId,
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


export const getMenu = async ({ category, query }: GetMenuParams): Promise<MenuItem[]> => {
  try {
    const queries: string[] = [];

    if (category && category !== "All") {
      queries.push(Query.equal("categories", category));
    }

    if (query) {
      queries.push(Query.search("name", query));
    }

    const menus = await databases.listDocuments<MenuItem>(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries,
    );

    return menus.documents;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to fetch menu"));
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await databases.listDocuments<Category>(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
    );

    return categories.documents;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to fetch categories"));
  }
};
