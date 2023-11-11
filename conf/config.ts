const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_API_ENDPOINT),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    homeUrl: String(process.env.NEXT_PUBLIC_HOOME_URL),
    signInUrl: String(process.env.NEXT_PUBLIC_SIGNIN_URL),
    signUpUrl: String(process.env.NEXT_PUBLIC_SIGNUP_URL)
}

export default conf;