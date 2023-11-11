import React, { Dispatch } from 'react'

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
const useDeleteTodo = (setTodos:Dispatch<React.SetStateAction<TodoSection[]>>,todos:TodoSection[]) => {

    function deleteTodo (id:string) {
        const _todos = todos.map((todoSection)=>{
          return {
            ...todoSection,
            list: todoSection?.list?.filter((todo)=>todo.id!==id)
          }
        })
        console.log('_tooo ',_todos)
        setTodos(_todos)
    }
    return { deleteTodo }
}

export default useDeleteTodo