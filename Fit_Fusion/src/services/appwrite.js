import { Client, Account, ID, Avatars, TablesDB, Query } from "appwrite";

export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  usersTableID: import.meta.env.VITE_APPWRITE_USERS_TABLE_ID,
  storageID: import.meta.env.VITE_APPWRITE_STORAGE_ID,
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectID);

const account = new Account(client);
const avatar = new Avatars(client);
const tablesDB = new TablesDB(client);

// Register User:-
export const createUser = async (form) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      form.email,
      form.password,
      form.username,
    );

    if (!newAccount) throw new Error("Account creation failed");

    const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.username)}&background=random`;

    const newUser = await tablesDB.createRow({
      databaseId: appwriteConfig.databaseID,
      tableId: appwriteConfig.usersTableID,
      rowId: ID.unique(),
      data: {
        fullName: form.username,
        email: form.email,
        profileImage: avatarURL,
        accountID: newAccount.$id,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

// Login User:-
export const loginUser = async ({ email, password }) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

// Logout User:-
export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    return { success: true };
  } catch (error) {
    throw new Error(error.message || "Logout failed");
  }
};

// Get Current Account:-
const getAccount = async () => {
  try {
    const currentUser = await account.get();
    return currentUser;
  } catch (error) {
    throw error;
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    const currentUser = await getAccount();
    if (!currentUser) throw new Error("No current user");

    const allRows = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseID,
      tableId: appwriteConfig.usersTableID,
      queries: [Query.equal("accountID", currentUser.$id)],
    });

    if (!allRows.rows || allRows.rows.length === 0) return null;

    return allRows.rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
