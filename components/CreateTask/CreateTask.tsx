'use client'
import React, { useState } from 'react'
import AddFloatingBtn from '../shared/AddFloatingBtn'
import CreateTaskModal from './CreateTaskModal'

const CreateTask = () => {
  const [show,setShow] = useState(false);
  return (
    <>
      <AddFloatingBtn
        onClick={()=>setShow(true)}
      />
      {show && <CreateTaskModal onClose={()=>setShow(false)} show={show} />}
    </>
  )
}

export default CreateTask