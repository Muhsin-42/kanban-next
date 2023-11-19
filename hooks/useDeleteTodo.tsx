import React, { Dispatch } from 'react'

type IUseDeleteTodo ={
  setGroupedTodos:Dispatch<React.SetStateAction<Map<TypedColumn, Column>>>,
  groupedTodos: Map<TypedColumn, Column>
}

const useDeleteTodo = ({setGroupedTodos,groupedTodos}:IUseDeleteTodo) => {

    function deleteTodo (id:string,columnName:TypedColumn) {

      const column = groupedTodos.get(columnName);
      if(column){
        const todoToDelete = column.todos.find(todo=> todo.$id === id);
        if(todoToDelete){
          const index = column.todos.indexOf(todoToDelete);
          const _groupedTodos = structuredClone(groupedTodos);

          const _column = _groupedTodos.get(columnName);
          if(_column){
            _column.todos.splice(index,1);
            setGroupedTodos(_groupedTodos);
          }
        }
      }
    }
    return { deleteTodo }
}

export default useDeleteTodo