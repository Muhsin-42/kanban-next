'use client'
import Image from "next/image"
import { MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import Avatar from "react-avatar"
import { UserCircleIcon } from "@heroicons/react/20/solid"
const Header = () => {
  return <header>
    <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">

        <div className="
            absolute top-0 left-0
            w-full h-96
            bg-gradient-to-br from-purple-400 to-slate-400
            filter blur-3xl opacity-50 -z-50
            rounded-md
            " />

            {/* Logo */}
            <Image src={'https://links.papareact.com/c2cdd5'} alt="Kanban" width={300} height={100} className="w-44 md:w-56 pb-10 md:pb-0 object-contain"/>


            <div className="flex items-center w-full space-x-5 flex-1 justify-end">            
                {/* Search bar */}
                <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial ">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 md:flex-initial" />
                    <input title="text" type="text" placeholder="Search" className="flex-1s   outline-none p-2"/> 
                    <button type="submit" hidden>Search</button>
                </form>
                {/* Profile */}
                <Avatar name="Muhsin Nissar"  round size="50" />
            </div>
        </div> 

        {/* GPT */}
        <div className="flex items-center justify-center px-5 md:py-5">
            <p className="flex items-center text-sm font-light pr-5 shadow-xl
                        rounded-xl w-9/12 bg-white p-5">
                <UserCircleIcon className="inline-block h-10 w-10 text-[#0055D1] mr-1"/>
                GPT to summarize the day....
            </p>
        </div>

  </header> 
  
}

export default Header