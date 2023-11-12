import { ITodoSection } from '@/interfaces/interfaces';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'


interface IUseAddTodo {
    setTodos: Dispatch<SetStateAction<ITodoSection[]>>;
    todos: ITodoSection[] 
}



const useAddTodo = ({setTodos,todos}: IUseAddTodo) => {

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