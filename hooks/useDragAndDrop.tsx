import { ITodoSection } from "@/interfaces/interfaces";
import React, { useState } from "react";


const useDragAndDrop = (initialTodos: ITodoSection[]) => {
  const [todos, setTodos] = useState<ITodoSection[]>(initialTodos);

  const handleOnDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      destination.draggableId === source.draggableId &&
      source.index === destination.index
    )
      return;

    const _todos = Array.from(todos);

    if (type === "group") {
      const [item] = _todos.splice(result.source.index, 1);
      _todos.splice(result.destination.index, 0, item);
      setTodos(_todos);
    }

    if (type === "todos") {
      const sourceGroupIndex = _todos.findIndex(
        (item) => item.id === source.droppableId
      );
      const destinationGroupIndex = _todos.findIndex(
        (item) => item.id === destination.droppableId
      );
      const [item] = _todos[sourceGroupIndex].list.splice(source.index, 1);
      _todos[destinationGroupIndex].list.splice(destination.index, 0, item);
      setTodos(_todos);
    }
  };

  return { todos, handleOnDragEnd, setTodos };
};

export default useDragAndDrop;
