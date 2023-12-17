import { Outlet } from "react-router-dom"
import React, { useState } from 'react';

import Header from "../../../componets/Admin/adminHeader"
import Sidebar from "../../../componets/Admin/Sidebar"

const AdminOutlet = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  
  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Outlet />

    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>

  </div>
  )
}

export default AdminOutlet