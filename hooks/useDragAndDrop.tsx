import { useBoardStore } from "@/store/BoardStore";
import { useState } from "react";

type InitialTodos = Map<TypedColumn, Column>;

const useDragAndDrop = (initialTodos: InitialTodos) => {
  const [groupedTodos, setGroupedTodos] = useState<InitialTodos>(initialTodos);
  const [updateStatusInDb] = useBoardStore((state) => [state.updateStatusInDb]);

  const handleOnDragEnd = (result: any) => {
    const { source, destination, type, draggableId } = result;
    console.log("result ", result);

    if (!destination) return;

    if (
      destination.draggableId === source.draggableId &&
      source.index === destination.index
    )
      return;

    const _todos = Array.from(groupedTodos);
    if (type === "group") {
      const item = _todos.splice(result.source.index, 1)[0];
      _todos.splice(result.destination.index, 0, item);
      const reorderedTodos = new Map(_todos);
      setGroupedTodos(reorderedTodos);
    }

    if (type === "todos") {
      const sourceGroupIndex = _todos.findIndex(
        (item) => item[0] === source.droppableId
      );
      const destinationGroupIndex = _todos.findIndex(
        (item) => item[0] === destination.droppableId
      );
      const [item] = _todos[sourceGroupIndex][1].todos.splice(source.index, 1);
      _todos[destinationGroupIndex][1].todos.splice(destination.index, 0, item);
      const reorderedTodos = new Map(_todos);
      setGroupedTodos(reorderedTodos);
    }
    updateStatusInDb(draggableId, destination?.droppableId!);
  };

  return { groupedTodos, handleOnDragEnd, setGroupedTodos };
};

export default useDragAndDrop;
