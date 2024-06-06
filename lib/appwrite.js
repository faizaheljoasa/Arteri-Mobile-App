import { ID, Account, Client, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.pkm2024.arteri',
  projectId: '665473ce003130caea7d',
  databaseId: '6654775f00195369c8c3',
  userCollectionId: '665477ec00179c49756b',
  settingsCollectionId: '6660d1fc001a24f0effd',
  examinationCollectionId: '6660d29a00049a28f7fd',
}

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (username, email, password) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    )

    if(!newAccount) throw Error
    
    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )

    return newUser
    
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const signIn = async (email, password) => {
  try {
    // Handle error session

    // const currentSessions = await account.listSessions();
    // if (currentSessions.sessions.length > 0) {
    //   for (const session of currentSessions.sessions) {
    //     await account.deleteSession(session.$id);
    //   }
    // }
    
    const session = await account.createEmailPasswordSession(email, password)

    return session
  } catch (error) {
    throw new Error(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error)
  }
}

export const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const changePassword = async (oldPassword, newPassword) => {
  try {
    await account.updatePassword(newPassword, oldPassword);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const changeUsername = async (newUsername) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const userId = currentAccount.$id;

    const users = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', userId)]
    );

    if (users.documents.length === 0) throw Error;

    const userDocId = users.documents[0].$id;

    await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userDocId,
      { username: newUsername }
    );

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const updateSettings = async (settings) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error('No current account found');

    const userId = currentAccount.$id;

    const users = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', userId)]
    );

    if (users.documents.length === 0) throw new Error('User not found');

    const userDocId = users.documents[0].$id;

    const userSettings = await databases.listDocuments(
      config.databaseId,
      config.settingsCollectionId,
      [Query.equal('settingArteriTools', userDocId)]
    );

    if (userSettings.documents.length > 0) {
      const settingsDocId = userSettings.documents[0].$id;

      const updatedSettings = await databases.updateDocument(
        config.databaseId,
        config.settingsCollectionId,
        settingsDocId,
        settings
      );

      return updatedSettings;
    } else {
      const newSettings = await databases.createDocument(
        config.databaseId,
        config.settingsCollectionId,
        ID.unique(),
        {
          settingArteriTools: userDocId,
          ...settings
        }
      );

      return newSettings;
    }

  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

