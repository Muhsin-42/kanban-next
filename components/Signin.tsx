'use client'

import React, {createContext, useState, FormEvent} from 'react'
import { ArrowRight, Loader, RotateCw } from 'lucide-react'
import authService from '@/appwrite/config'
import { useRouter } from 'next/navigation'
import useAuth from '../context/useAuth'
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link'
import AuthForm from './shared/Form'

const fields = [
  { id: 'email', type: 'email', label: 'Email address'},
  { id: 'password', type: 'password', label: 'Password' }
];

const dynamicData = {
  href: '/sign-up',
  text: "Don't have an account? ",
  label: 'Sign Up',
  heading: 'Sign In'
};

const Signin = () => {
  const router = useRouter();
  const [formData,setFormData] = useState({email: '',password:''})
  const [formLoading,setFormLoading] = useState(false);
  const [error,setError] = useState('')
  
  const { setAuthStatus } = useAuth();

  const  handleLogin = async (e: FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      setFormLoading(true);
      try {
        const session = await authService.login(formData);
        if(session){
          setAuthStatus(true);
          setFormLoading(false)
          // toast.success('Login Success');
          router.push('/')
        }
      } catch (error:any) {
        setFormLoading(false)
        setError(error.message)
      }
  }

  return (
    <>
    <AuthForm
    onSubmit={handleLogin}
    formData={formData}
    setFormData={setFormData}
    formLoading={formLoading}
    fields={fields}
    dynamicData={dynamicData}
  />
  {/* <ToastContainer/> */}
    </>
  )
}

export default Signin;