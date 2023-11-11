'use client'
import React, { Dispatch, FormEvent, SetStateAction } from 'react'


interface AddNewTodoProps {
    addTodo: (e: FormEvent<HTMLFormElement>) => void;
    setNewTodo: Dispatch<SetStateAction<string>>;
    newTodo: string
}

const AddNewTodo = ({addTodo,newTodo,setNewTodo}:AddNewTodoProps) => {
  return (
    <form onSubmit={addTodo} className="flex w-full  my-3 mb-5 justify-center gap-1">
        <input type="text" placeholder="ENTER TODO" 
          value={newTodo}
          onChange={(e)=>setNewTodo(e.target.value)}
          className="w-7/12 py-3 font-semibold placeholder:font-bold text-xl outline-none rounded-full px-5" />
        <button type="submit" className="px-5 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 hover:from-purple-400 hover:to-purple-700 text-white font-bold text-xl">
          ADD 
        </button>
      </form>
  )
}

export default AddNewTodo