import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store';

export default function Nonroute() {
   const {user} = useAuthStore();
    if(user !== null){
      return <Navigate to={"/"} replace={true}/> 
    }
  return (
    <div>nonroute
      <Link to="/"> Home</Link>
        <Outlet/> 
    </div>
    
  )
}
