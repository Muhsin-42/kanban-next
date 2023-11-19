const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_API_ENDPOINT),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    databaseId: String(process.env.NEXT_PUBLIC_DATABASE_ID),
    todosCollectionId: String(process.env.NEXT_PUBLIC_TOOLS_COLLECTION_ID),

    homeUrl: String(process.env.NEXT_PUBLIC_HOME_URL),
    signInUrl: String(process.env.NEXT_PUBLIC_SIGNIN_URL),
    signUpUrl: String(process.env.NEXT_PUBLIC_SIGNUP_URL)
}
export default conf;