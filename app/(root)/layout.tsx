'use client'
import { useEffect, useState } from 'react';
import '../globals.css'
import appwriteAuthService from '@/appwrite/config';
import { AuthProvider } from '@/context/authContext';
import { useRouter } from 'next/navigation';

const ProtectedLayout = ({children}:{children:React.ReactNode}) =>{
    const router = useRouter();
    const [authStatus,setAuthStatus] = useState(false);
    const [loader,setLoader] = useState(true);
    useEffect(()=>{
        appwriteAuthService.isLoggedIn()
        .then(setAuthStatus)
        .finally(()=>setLoader(false));
    },[])

    useEffect(()=>{
        if(!loader && !authStatus){
            router.push('/sign-in')
        }
    },[loader,authStatus,router])

    return(
        <AuthProvider value={{authStatus,setAuthStatus}}>
            {!loader &&
                <main>
                    {children}
                </main>
            }
        </AuthProvider>
    )
}

export default ProtectedLayout;