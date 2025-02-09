import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store';

export default function Dashboard() {
  const {user} = useAuthStore();
  if(user === null){
    return <Navigate to={"/auth/login"} replace={true}/> 
  }
  return (


    <div>Dashboard
      <Link to={'/auth/login'}>login page</Link>
          <Outlet/> 
    </div>
  )
}
