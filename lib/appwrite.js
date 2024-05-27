import { ID, Account, Client } from 'react-native-appwrite';

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

export const createUser = () => {
  account.create(ID.unique(), 'me@example.com', 'password', 'Faizahel Joasa')
      .then(function (response) {
          console.log(response);
      }, function (error) {
          console.log(error);
      });
}

