import { ID, Account, Client, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.pkm2024.arteri',
  projectId: '665473ce003130caea7d',
  databaseId: '6654775f00195369c8c3',
  userCollectionId: '665477ec00179c49756b'
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
