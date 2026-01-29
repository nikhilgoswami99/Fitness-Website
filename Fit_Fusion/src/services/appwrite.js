import { Client, Account, ID, Avatars, TablesDB, Query, Storage } from "appwrite";

export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  usersTableID: import.meta.env.VITE_APPWRITE_USERS_TABLE_ID,
  savedWorkoutsTableID: import.meta.env.VITE_APPWRITE_SAVED_WORKOUTS_TABLE_ID,
  bucketID: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectID);

const account = new Account(client);
const avatar = new Avatars(client);
const tablesDB = new TablesDB(client);
const storage = new Storage(client);

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

    const avatarURL = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`;

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



// Get Current User:-
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

// Update Current User:-
export const updateCurrentUser = async (initialState) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user");

    const updatedUser = await tablesDB.updateRow({
      databaseId: appwriteConfig.databaseID,
      tableId: appwriteConfig.usersTableID,
      rowId: currentUser.$id,
      data: {
        fullName: initialState.name,
        age: parseInt(initialState.age) || null,
        height: parseInt(initialState.height) || null,
        weight: parseInt(initialState.weight) || null,
        goalWeight: parseInt(initialState.goalWeight) || null,
        bodyFat: parseInt(initialState.bodyFat) || null,
        primaryGoal: initialState.primaryGoal,
        targetDate: initialState.targetDate ? new Date(initialState.targetDate).toISOString() : null,
        weeklyWorkouts: parseInt(initialState.weeklyWorkouts) || null,
        dailyCalories: parseInt(initialState.dailyCalories) || null,
        sleepTarget: parseInt(initialState.sleepTarget) || null,
        waterIntake: parseInt(initialState.waterIntake) || null,
      },
    });

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// Update Profile Picture:-
export const updateProfilePicture = async (file, userId) => {
  try {
    console.log("Starting profile picture upload...", { file, userId });
    
    // Upload file to Appwrite Storage
    const uploadedFile = await storage.createFile({
      bucketId: appwriteConfig.bucketID,
      fileId: ID.unique(),
      file: file,
    });
    
    console.log("File uploaded successfully:", uploadedFile);

    // Get the preview URL for the uploaded file
    const imageUrl = storage.getFileView({
      bucketId: appwriteConfig.bucketID,
      fileId: uploadedFile.$id,
    });
    
    console.log("Image URL generated:", imageUrl);

    // Update user row with new profile image URL
    const updatedUser = await tablesDB.updateRow({
      databaseId: appwriteConfig.databaseID,
      tableId: appwriteConfig.usersTableID,
      rowId: userId,
      data: { profileImage: imageUrl },
    });

    console.log("Profile updated successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error updating profile picture:", error);
    throw error;
  }
};

// Save Workout:-
export const saveWorkout = async (data) => {
  try {
    const response = await tablesDB.createRow({
      databaseId: appwriteConfig.databaseID,
      tableId: appwriteConfig.savedWorkoutsTableID,
      rowId: ID.unique(),
      data: data,
    });
    return response;
  } catch (error) {
    throw new Error(error.message || "Failed to save workout");
  }
};

// Get Saved Workouts:-
export const getSavedWorkouts = async (userId) => {
  try {
    const response = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseID,
      tableId: appwriteConfig.savedWorkoutsTableID,
      queries: [Query.equal("userID", userId)],
    });
    return response.rows;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch saved workouts");
  }
};

// Remove Saved Workout:-
export const removeSavedWorkout = async (documentId) => {
  try {
    await tablesDB.deleteRow({
      databaseId: appwriteConfig.databaseID,
      tableId: appwriteConfig.savedWorkoutsTableID,
      rowId: documentId,
    });
    return documentId;
  } catch (error) {
    throw new Error(error.message || "Failed to remove workout");
  }
};




