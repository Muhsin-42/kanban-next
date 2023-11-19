import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoList from "./TodoBar";
import { Itodo } from "@/interfaces/interfaces";

type ISingleBoardProps = {
  name: TypedColumn;
  id: string;
  index: number;
  todos: Todo[];
  deleteTodo: (id:string,columnName:TypedColumn) =>void;
};


const SingleBoard = ({ name, id, index, todos, deleteTodo }: ISingleBoardProps) => {
  return (
    <Draggable key={id} index={index} draggableId={id}>
      {(provided) => (
        <li
          className=" w-full bg-gradient-to-b  from-[#ffffff1f] to-[#fff] text-white shadow-2xl   rounded-xl flex cursor-moved hover:scale-1"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex flex-col px-5 w-full m-0  py-5">
            <h3 className="text-black font-bold text-xl pb-3">{name}</h3>
            <Droppable droppableId={id} type="todos">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className=" min-w-full !opacity-80 min-h-full"
                >
                  <TodoList
                    todos={todos}
                    provided={provided}
                    deleteTodo={deleteTodo}
                    columnName={name}
                  />
                </div>
              )}
            </Droppable>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default SingleBoard;
