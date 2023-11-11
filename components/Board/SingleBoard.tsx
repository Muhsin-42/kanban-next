import { Bars3Icon } from "@heroicons/react/24/solid";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const SingleBoard = ({
  name,
  id,
  index,
  list,
}: {
  name: string;
  id: string;
  index: number;
  list: any;
}) => {
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
                    name={name}
                    id={id}
                    todos={list} 
                    provided={provided}
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

function TodoList({ name, id, todos, provided }: any) {
  return (
    <div className=" flex flex-col gap-3">
      {todos?.map((todo: any, index: any) => (
        <Draggable key={todo.id} index={index} draggableId={todo.id}>
          {(provided) => (
            <div
              className="flex bg-gradient-to-rd shadow-2xl bg-white  from-sky-10d0 to-sky-200d text-blue-950 font-bold gap-3 p-3 rounded w-10/12 m-auto"
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <Bars3Icon className="h-6 w-6 mr-3 " />
              <h3>{todo.task}</h3>
            </div>
          )}
        </Draggable>
      ))}
      {
        todos?.length <=0 && <span className="text-black opacity-30 font-bold text-2xl items-center w-full h-full my-auto text-center mt-10">Empty List</span>
      }
      {provided.placeholder}
    </div>
  );
}
