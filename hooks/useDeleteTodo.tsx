import { ITodoSection } from '@/interfaces/interfaces'
import React, { Dispatch } from 'react'

type IUseDeleteTodo ={
  setTodos:Dispatch<React.SetStateAction<ITodoSection[]>>,
  todos:ITodoSection[]
}

const useDeleteTodo = ({setTodos,todos}:IUseDeleteTodo) => {

    function deleteTodo (id:string) {
        const _todos = todos.map((todoSection)=>{
          return {
            ...todoSection,
            list: todoSection?.list?.filter((todo)=>todo.id!==id)
          }
        })
        setTodos(_todos)
    }
    return { deleteTodo }
}

export default useDeleteTodo