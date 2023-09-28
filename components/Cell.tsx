'use client'
import React, { DragEvent } from 'react';
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Itodo } from '@/interfaces/interfaces';

interface CellProps {
    todo: Itodo;
    index: number;
    handleDragStart: (e: DragEvent<HTMLDivElement>,index: number)=>void;
    handleDragEnter: (e: DragEvent<HTMLDivElement>, index: number)=>void;
    handleDragEnd: (e:DragEvent<HTMLDivElement>,index: number)=>void;
}

const Cell: React.FunctionComponent<CellProps> = ({ 
    todo, 
    index, 
    handleDragStart,
    handleDragEnter,
    handleDragEnd
}) => {
    return (
        <div
            className='p-5 bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg rounded-sm flex cursor-move hover:scale-1'
            style={{transform: '0.3s ease'}}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={(e) => handleDragEnd(e, index)}
        >
            <Bars3Icon className="h-6 w-6 text-white mr-3 " />
            {todo?.task}
        </div>
    )
}

export default Cell;