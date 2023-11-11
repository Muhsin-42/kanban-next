"use client";
import React, { FormEvent, FC, SetStateAction, Dispatch } from "react";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import appwriteService from "@/appwrite/config";
interface fieldType {
  id: string;
  type: string;
  label: string;
}

interface AuthFormProps {
  fields: fieldType[];
  dynamicData: { href: string; text: string; label: string; heading: string };
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
  dynamicData,
}) => {
  return (
    <section className="flex justify-center w-full h-screen ">
      <div className="grid grid-cols-1 w-full">
        <div className="flex items-center  justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div
            className={`w-11/12 xl:w-4/12 2xl:w-3/12 md:w-6/12 sm:w-8/12 p-10 rounded-3xl shadow-2xl cursor-pointer hover:scale-105 ${
              dynamicData?.heading === "Sign up"
                ? "hover:rotate-1"
                : "hover:-rotate-1"
            } transition-all duration-500 shadow-purple-400`}
          >
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              {dynamicData.heading}
            </h2>
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
                  <div key={field.id}>
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
                    {dynamicData.heading === "Sign up"
                      ? "Create Account"
                      : "Login"}
                    {formLoading ? (
                      <Loader size={16} className="ml-2 animate-spin" />
                    ) : (
                      <ArrowRight className="ml-2" size={16} />
                    )}
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                onClick={() => {
                  console.log("sss");
                  appwriteService.createUserWithOAuth2("google");
                }}
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
