'use client'
// import { Client } from 'appwrite';
import { DragEvent, useEffect, useRef, useState } from 'react';
import { useBoardStore } from '@/store/BoardStore';
import Cell from './Cell';
import { Itodo } from '@/interfaces/interfaces' 
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const dataTodos = [
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
  },
  {
    id: '5e1c8a9d',
    task: 'Read a book',
    description: 'Read the first chapter of "The Great Gatsby"',
    status: 'todo',
  },
  {
    id: '7b2d9f1a',
    task: 'Write code',
    description: 'Work on a new project for an hour',
    status: 'todo',
  },
];


const Board = () => {
  const [todos,setTodos] = useState(dataTodos);
  const [fromIndex,setFromIndex] = useState(0);
  const [toIndex,setToIndex] = useState(0)

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    setFromIndex(index);
  }
  
  const handleDragEnter = (e: DragEvent<HTMLDivElement>, index: number) => {
    if(index === fromIndex) return false;
       const tempArray = [...todos];
    const [draggedItem] = tempArray.splice(fromIndex,1);
    tempArray.splice(index,0,draggedItem);
  }
  
  const handleDragEnd = (e: DragEvent<HTMLDivElement>, index: number) => {
    console.log('onDragEnd', index);
  }
  
  return (
      <section className=''>
        <div className='w-9/12 flex gap-5 m-auto'>
          {/* Do */}
              <DragDropContext>
                <Droppable droppableId='characters'>
                  {
                    (provided)=>(
                      <div {...provided.droppableProps} ref={provided.innerRef}
                      className='flex flex-col gap-3 w-4/12 transition-transform'>
                      {
                        todos?.map((todo:Itodo,index)=>{
                          return (
                            <Cell 
                                key={todo?.id} 
                                index={index} 
                                todo={todo} 
                                handleDragStart={handleDragStart}
                                handleDragEnter={handleDragEnter}
                                handleDragEnd={handleDragEnd}
                                />
                          )
                        })
                      }
                      </div>
                  )}
                </Droppable>
              </DragDropContext>

        </div>
      </section>
    )
  }

export default Board














  // const getBoard = useBoardStore(state => state.getBoard);
  // useEffect(()=>{
  //   getBoard();
  // },[getBoard])

  // <DragDropContext >
  //     <Droppable droppableId='board' direction='horizontal' type='column'>
  //         {(provided) => (
  //             <div>
  //                 {/* rendering all the columns */}
  //             </div>
  //         )}
  //         {/* <Draggable/> */}
  //     </Droppable>
  // </DragDropContext>