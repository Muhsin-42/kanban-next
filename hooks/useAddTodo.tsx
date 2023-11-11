import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'

interface TodoSection {
    id: string;
    status: string;
    name: string;
    list: {
      id: string;
      task: string;
      description: string;
      status: string;
    }[];
  }
  

interface IUseAddTodo {
    setNewTodo: Dispatch<SetStateAction<string>>;
    todos: TodoSection[] 
}



const useAddTodo = (setTodos:Dispatch<SetStateAction<TodoSection[]>>,todos:TodoSection[]) => {

    const [newTodo,setNewTodo] = useState('');

    function addTodo (e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!newTodo.trim()) return;
        const _todos = todos.map((todoSection)=>{
          if(todoSection.name === 'DO'){
            return {
              ...todoSection,
              list: [
                ...todoSection.list,
                {
                  id: String(Math.random()),
                  task: newTodo.trim(),
                  description: newTodo.trim(),
                  status: 'todo'
                }
              ]
            }
          }else {
            return todoSection;
          }
        })
        setNewTodo('')
        setTodos(_todos);
    }

    return { addTodo, setNewTodo, newTodo };
}

export default useAddTodo