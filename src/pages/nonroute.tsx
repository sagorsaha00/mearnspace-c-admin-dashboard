import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Nonroute() {
  return (
    <div>nonroute
        <Outlet/> 
    </div>
    
  )
}
