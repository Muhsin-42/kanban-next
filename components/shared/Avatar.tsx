"use client";
import appwriteService from "@/appwrite/config";
import { Loader, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const getAlphabets = (name: string) => {
  const splitedWords = name.split(" ").filter((word) => !!word);
  let alphabets = splitedWords[0][0];
  if (splitedWords.length > 1) {
    alphabets += splitedWords[1][0];
  }
  return alphabets.toUpperCase();
};


const Avatar = ({ name }: { name: string }) => {
  const alphabets = getAlphabets(name);
  const [showPopup, setShowPoup] = useState(false);
  const [formLoading,setFormLoading] = useState(false);

  const router = useRouter();
  const logout = async () =>{
    setFormLoading(true);    
    await appwriteService.logout();
    setFormLoading(false);
    router.push('/sign-in')
  }

  return (
    <div
      className="relative"
      onMouseOver={() => setShowPoup(true)}
      onMouseOut={() =>{
        if(!formLoading)
          setShowPoup(false)
      } 
    }
    >
      <button
        className="bg-purple-700 text-center p-2.5 rounded-full text-white font-bold cursor-pointer hover:scale-105"
        type="button"
      >
        {alphabets}
      </button>
      {showPopup && (
        <div className="flex absolute bg-white w-32 px-5 py-2 right-1 rounded-md">
          <button type="button" className="cursor-pointer w-full flex gap-2 justify-center items-center"
            onClick={logout}
            disabled={formLoading}
          >
            Logout
            {
                formLoading ? <Loader size={16} className='ml-2 animate-spin' />
                : <LogOut className="ml-2" size={16} />
            }
            
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
