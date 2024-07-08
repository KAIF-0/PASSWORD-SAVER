import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(process.env.PROJECT_ENDPOINT)
    .setProject(process.env.PROJECT_ID)
   

export const account = new Account(client);


export { ID } from 'appwrite';