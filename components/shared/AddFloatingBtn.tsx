import { Plus, PlusCircle } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const AddFloatingBtn = ({onClick}:{onClick:()=>void}) => {
  return (
    <Button className='fixed bottom-10 right-24 bg-purple-500 hover:bg-purple-600 p-3 h-14 w-14 rounded-full cursor-pointer hover:scale-105'
      onClick={onClick}
    >
        <Plus  color='white' className='font-extrabold' />
    </Button>
  )
}

export default AddFloatingBtn