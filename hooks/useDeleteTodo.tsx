import { deleteTodoAction } from "@/lib/deleteTodo.Action";
import React, { Dispatch } from "react";

type IUseDeleteTodo = {
  setGroupedTodos: Dispatch<React.SetStateAction<Map<TypedColumn, Column>>>;
  groupedTodos: Map<TypedColumn, Column>;
};

const useDeleteTodo = ({ setGroupedTodos, groupedTodos }: IUseDeleteTodo) => {
  const deleteFromDb = async (todoId: string) => {
    try {
      deleteTodoAction(todoId);
    } catch (error) {
      console.log("Error Deleting todo", error);
    }
  };

  function deleteTodo(id: string, columnName: TypedColumn) {
    const column = groupedTodos.get(columnName);
    if (column) {
      const todoToDelete = column.todos.find((todo) => todo.$id === id);
      if (todoToDelete) {
        const index = column.todos.indexOf(todoToDelete);
        const _groupedTodos = structuredClone(groupedTodos);

        const _column = _groupedTodos.get(columnName);
        if (_column) {
          _column.todos.splice(index, 1);
          setGroupedTodos(_groupedTodos);
        }
      }

      deleteFromDb(id);
    }
  }
  return { deleteTodo };
};

export default useDeleteTodo;
