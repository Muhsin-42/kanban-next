'use client'
import { account } from '@/appwrite/config';
import useAuth from '@/context/useAuth';
import { redirect } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// import authService, { account } from './appwrite/config'
// import { redirect } from 'next/navigation'

const Autharize = () => {

    const {authStatus} = useAuth();
    const [loggedIn,setLoggedIn] = useState<any>(false);
    
    const checkLoggedIn = async () =>{
        try {
            const session = await account.getSession('current');
            if(session){
                const user = await account.get();
                console.log('uuuu ',user)
                if(!user) redirect('/sign-in')
                setLoggedIn(user);    
            }
        } catch (error) {
            redirect('/sign-in')
            console.log('error session',error)
        }
    }

    useEffect(()=>{
        checkLoggedIn();
    },[])

    console.log('userr Logg ',loggedIn)

  return (
    <div>Autharize</div>
  )
}

export default Autharize