"use client";
import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SingleBoard from "./SingleBoard";
import AddNewTodo from "./AddNewTodo";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useResize from "@/hooks/useResize";
// import useAddTodo from "@/hooks/useAddTodo";
import useDeleteTodo from "@/hooks/useDeleteTodo";
import { useBoardStore } from "@/store/BoardStore";

const Board = () => {
  const [board, getBoardStore] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);
  const { orientation } = useResize();
  const { groupedTodos, setGroupedTodos, handleOnDragEnd } = useDragAndDrop(
    board.columns
  );
  // const { newTodo, setNewTodo, addTodo } = useAddTodo({setGroupedTodos,groupedTodos});
  const { deleteTodo } = useDeleteTodo({ setGroupedTodos, groupedTodos });

  const get = async () => {
    await getBoardStore();
  };

  useEffect(() => {
    setGroupedTodos(board.columns);
  }, [board]);

  useEffect(() => {
    get();
  }, [getBoardStore]);

  return (
    <section className="mt-10">
      {/* <AddNewTodo 
      addTodo={addTodo}
      setNewTodo={setNewTodo}
      newTodo={newTodo}
      /> */}
      <div className="w-11/12 md:w-10/12 lg:w-9/12 flex m-auto  rounded-lg overflow-hidden">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos" type="group" direction={orientation}>
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex gap-5  w-full flex-col lg:flex-row pb-20"
              >
                {groupedTodos &&
                  Array.from(groupedTodos.entries())?.map(
                    ([id, column], index) => (
                      <SingleBoard
                        key={id}
                        name={id}
                        id={id}
                        index={index}
                        todos={column.todos}
                        deleteTodo={deleteTodo}
                      />
                    )
                  )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section>
  );
};

export default Board;
