"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import dataTodos from "./data";
import SingleBoard from "./SingleBoard";

interface Itodo {
  id: string;
  task: string;
  description: string;
  status: string;
}

type Direction = "horizontal" | "vertical";

const Board = () => {
  const [todos, setTodos] = useState(dataTodos);
  const [newTodo,setNewTodo] = useState('');
  const [orientation, setOrientation] = useState<Direction>("horizontal");

  const handleOnDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (destination.draggableId === source.draggableId &&
        source.index === destination.index
      )return;

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

  function handleResize() {
    const _orientation = window.innerWidth < 1024 ? "vertical" : "horizontal";
    setOrientation(_orientation);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function addTodo (e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!newTodo.trim()) return;
    const _todos = todos.map((todoSection)=>{
      if(todoSection.name === 'DO'){
        todoSection.list.push({
          id: String(Math.random()),
          task: newTodo.trim(),
          description: newTodo.trim(),
          status: 'todo'
        })
      }
      return todoSection;
    })
    console.log('_todos',_todos)
    setNewTodo('')
    setTodos(_todos);
  }

  return (
    <section className="mt-10">
      
      {/* ADD NEW TODO */}
      <form onSubmit={addTodo} className="flex w-full  my-3 mb-5 justify-center gap-1">
        <input type="text" placeholder="ENTER TODO" 
          value={newTodo}
          onChange={(e)=>setNewTodo(e.target.value)}
          className="w-7/12 py-3 font-semibold placeholder:font-bold text-xl outline-none rounded-full px-5" />
        <button type="submit" className="px-5 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 hover:from-purple-400 hover:to-purple-700 text-white font-bold text-xl">
          ADD 
        </button>
      </form>

      <div className="w-11/12 md:w-10/12 lg:w-9/12 flex m-auto  rounded-lg overflow-hidden">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos" type="group" direction={orientation}>
            {(provided) => (
              <ul 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex gap-5 w-full flex-col lg:flex-row pb-20"
              >
                {todos?.map(({ name, id, list }, index) => (
                  <SingleBoard key={id} name={name} id={id} index={index} list={list} />
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
