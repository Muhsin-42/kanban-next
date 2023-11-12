"use client";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import dataTodos from "./data";
import SingleBoard from "./SingleBoard";
import AddNewTodo from "./AddNewTodo";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useResize from "@/hooks/useResize";
import useAddTodo from "@/hooks/useAddTodo";
import useDeleteTodo from "@/hooks/useDeleteTodo";

const Board = () => {
  const { todos, handleOnDragEnd, setTodos } = useDragAndDrop(dataTodos)
  const { orientation } = useResize();
  const { newTodo, setNewTodo, addTodo } = useAddTodo({setTodos,todos});
  const { deleteTodo } = useDeleteTodo({setTodos,todos});

  return (
    <section className="mt-10">     
      <AddNewTodo 
      addTodo={addTodo}
      setNewTodo={setNewTodo}
      newTodo={newTodo}
      />
      <div className="w-11/12 md:w-10/12 lg:w-9/12 flex m-auto  rounded-lg overflow-hidden">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos" type="group" direction={orientation}>
            {(provided) => (
              <ul 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex gap-5  w-full flex-col lg:flex-row pb-20"
              >
                {todos?.map(({ name, id, list }, index) => (
                  <SingleBoard key={id} name={name} id={id} index={index} list={list} deleteTodo={deleteTodo} />
                ))}
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