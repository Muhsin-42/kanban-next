'use client'
import React, { DragEvent } from 'react';
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Itodo } from '@/interfaces/interfaces';

interface CellProps {
    task: string;
    provided: any;
}

const Cell: React.FunctionComponent<CellProps> = ({ 
    task, 
    provided 
}) => {
    return (
        <div
        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
            className='p-5 bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg rounded-sm flex cursor-move hover:scale-1'
            style={{transform: '0.3s ease'}}
        >
            <Bars3Icon className="h-6 w-6 text-white mr-3 " />
            {task}
        </div>
    )
}

export default Cell;