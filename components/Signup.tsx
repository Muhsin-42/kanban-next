'use client'

import React, { useState, FormEvent} from 'react'
import { ArrowRight, Loader } from 'lucide-react'
import authService from '@/appwrite/config'
import { useRouter } from 'next/navigation'
import useAuth from '../context/useAuth'
import Link from 'next/link'
import AuthForm from './shared/Form'

const fields = [
  { id: 'name', type: 'text', label: 'Full Name'},
  { id: 'email', type: 'email', label: 'Email address'},
  { id: 'password', type: 'password', label: 'Password' }
];

const dynamicData = {
  href: '/sign-in',
  text: 'Have an account? ',
  label: 'Sign In',
  heading: 'Sign up'
};



const Signup = () => {
  const router = useRouter();
  const [formData,setFormData] = useState<{name?: string, email: string, password: string}>({name: '',email: '',password:''})
  const [formLoading,setFormLoading] = useState(false);
  const [error,setError] = useState('')
  
  const { setAuthStatus } = useAuth();

  const  register = async (e: FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      setFormLoading(true);
      try {
        const session = await authService.createUserAccount(formData);
        if(session){
          setAuthStatus(true);
          setFormLoading(false);
          router.push('/')
        }
      } catch (error:any) {
        setFormLoading(false);
        setError(error.message)
      }
  }

  return (
        <AuthForm
          onSubmit={register}
          formData={formData}
          setFormData={setFormData}
          formLoading={formLoading}
          fields={fields}
          dynamicData={dynamicData}
        />
  )
}

export default Signup