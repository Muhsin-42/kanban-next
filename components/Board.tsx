import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Bars3Icon } from '@heroicons/react/24/solid';

interface Itodo {
  id: string;
  task: string;
  description: string;
  status: string;
}

const dataTodos = [
  {
    id: '111',
    status: 'do',
    name: 'DO',
    list: [
      {
        id: '1a9fde3c',
        task: 'Do your homework',
        description: 'You need to complete maths homework today',
        status: 'todo',
      },
      {
        id: '3c7b1e8f',
        task: 'Buy groceries',
        description: 'Get milk, eggs, and bread from the store',
        status: 'todo',
      },
      {
        id: '2f6d4a8e',
        task: 'Go for a run',
        description: 'Run for 30 minutes in the park',
        status: 'todo',
      }
    ]
  },
  {
    id: '222',
    status: 'doing',
    name: 'DOING',
    list: [
      {
        id: '5e1c8a9d',
        task: 'Read a book',
        description: 'Read the first chapter of "The Great Gatsby"',
        status: 'todo',
      }
    ]
  },
  {
    id: '333',
    status: 'done',
    name: 'DONE',
    list: [
      {
        id: '7b2d9f1a',
        task: 'Write code',
        description: 'Work on a new project for an hour',
        status: 'todo',
      },
    ]
  }
];



const Board = () => {
  const [todos, setTodos] = useState(dataTodos);
  const [orientation, setOrientation] = useState('horizontal');

  const handleOnDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      destination.draggableId === source.draggableId &&
      source.index === destination.index
    )
      return;

    const _todos = Array.from(todos);

    if (type === 'group') {
      const [item] = _todos.splice(result.source.index, 1);
      _todos.splice(result.destination.index, 0, item);
      setTodos(_todos);
    }

    if (type === 'todos') {
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
    const _orientation = window.innerWidth < 1024 ? 'vertical' : 'horizontal';
    setOrientation(_orientation);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className='mt-10'>
      <div className='w-11/12 md:w-10/12 lg:w-9/12 flex m-auto  rounded-lg overflow-hidden'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='todos' type='group' direction={orientation}>
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='flex gap-5 w-full flex-col lg:flex-row'
              >
                {todos?.map(({ name, id, list }, index) => (
                  <Draggable key={id} index={index} draggableId={id}>
                    {(provided) => (
                      <li
                        className=' w-full bg-gradient-to-b  from-[#ffffff1f] to-[#fff] text-white shadow-lg  rounded-xl flex cursor-move hover:scale-1'
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <TodoList name={name} id={id} todos={list} />
                      </li>
                    )}
                  </Draggable>
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

function TodoList({ name, id, todos }: any) {
  return (
    <div className='flex flex-col px-5 w-full m-0  py-5'>
      <h3 className='text-black font-bold text-xl pb-3'>{name}</h3>
      <Droppable droppableId={id} type='todos'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className=' min-w-full !opacity-80 min-h-full'
          >
            <div className=' flex flex-col gap-3'>
              {todos?.map((todo: any, index: any) => (
                <Draggable key={todo.id} index={index} draggableId={todo.id}>
                  {(provided) => (
                    <div
                      className='flex bg-white text-blue-950 font-bold gap-3 p-3 rounded w-10/12 m-auto'
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <Bars3Icon className='h-6 w-6 mr-3 ' />
                      <h3>{todo.task}</h3>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Board;
