"use client";
import React, {FormEvent,FC,SetStateAction,Dispatch,} from "react";
import { ArrowRight, Loader } from "lucide-react";
import Link from 'next/link'
interface fieldType {
  id: string;
  type: string;
  label: string;
}

interface AuthFormProps {
  fields: fieldType[];
  dynamicData: {href: string,text:string, label: string, heading: string}
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formData: { [key: string]: string };
  setFormData: Dispatch<
    SetStateAction<{ name?: string; email: string; password: string }>
  >;
  formLoading: boolean;
}

const AuthForm: FC<AuthFormProps> = ({
  onSubmit,
  formData,
  setFormData,
  formLoading,
  fields,
  dynamicData
}) => {
  return (
    <section className='flex justify-center w-full h-screen '>
    <div className="grid grid-cols-1 w-full">
      <div className="flex items-center  justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className={`w-11/12 xl:w-4/12 2xl:w-3/12 md:w-6/12 sm:w-8/12 p-10 rounded-3xl shadow-2xl cursor-pointer hover:scale-105 ${dynamicData?.heading==='Sign up'?'hover:rotate-1':'hover:-rotate-1'} transition-all duration-500 shadow-purple-400`}>
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">{dynamicData.heading}</h2>
          <p className="mt-2 text-base text-gray-600">
            {dynamicData.text} 
            <Link
              href={dynamicData.href}
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              {dynamicData.label}
            </Link>
          </p>
    <form action="#" method="POST" className="mt-8" onSubmit={onSubmit}>
      <div className="space-y-5">
        {fields?.map((field) => (
          <div>
            <label
              htmlFor="name"
              className="text-base font-medium text-gray-900"
            >
              {field.label}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type={field.type}
                placeholder={field.label}
                id="name"
                value={formData[field.id]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.id]: e.target.value,
                  }))
                }
              ></input>
            </div>
          </div>
        ))}

        <div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:bg-opacity-50"
            disabled={formLoading}
          >
            {
                dynamicData.heading === 'Sign up' ? 'Create Account'
                : 'Login'
            }
            {formLoading ? (
              <Loader size={16} className="ml-2 animate-spin" />
            ) : (
              <ArrowRight className="ml-2" size={16} />
            )}
          </button>
        </div>
      </div>
    </form>
    </div>
      </div>
    </div>
    </section>
  );
};

export default AuthForm;
