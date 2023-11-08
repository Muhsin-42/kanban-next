import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT||'')  // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID||'');               // Your project ID

const account = new Account(client);

const promise = account.create('[USER_ID]', 'email@example.com', '');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
