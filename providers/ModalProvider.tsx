"use client"

import Modal from "@/components/Modal";
import { useState, useEffect } from "react"


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null
    }

  return (
    <div className="text-white">
      <Modal title="test Modal" description="test description" isOpen onChange={()=>{}}>
        test children
      </Modal>
    </div>
  )
}

export default ModalProvider
