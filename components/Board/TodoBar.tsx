import { Bars3Icon } from "@heroicons/react/24/solid";
import { Cross, X } from "lucide-react";
import { Draggable } from "react-beautiful-dnd";

export default function TodoList({ name, id, todos, provided,deleteTodo }: any) {
    return (
      <div className=" flex flex-col gap-3">
        {todos?.map((todo: any, index: any) => (
          <Draggable key={todo.id} index={index} draggableId={todo.id}>
            {(provided) => (
              <div
                className="group  flex justify-between bg-gradient-to-rd shadow-2xl bg-white  from-sky-10d0 to-sky-200d text-blue-950 font-bold gap-3 p-3 rounded w-10/12 m-auto"
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
              >
                <div className="flex justify-start">
                    <Bars3Icon className="h-6 w-6 mr-3 " />
                    <h3 className="h-fit w-full ">{todo.task}</h3>
                </div>
                <button
                    type="button"
                    onClick={()=>deleteTodo(todo.id)} 
                    className="transform opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-extrabold text-red-500 hover:-rotate-12 cursor-pointer hover:scale-125" 
                >
                    <X strokeWidth={3}/>{''}
                </button>
              </div>
            )}
          </Draggable>
        ))}
        {
          todos?.length <=0 && <span className="text-black opacity-30 font-bold text-2xl items-center w-full h-full text-center mt-5 mb-10">Empty List</span>
        }
        {provided.placeholder}
      </div>
    );
  }