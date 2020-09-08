import React from "react";
import { useSelector } from "react-redux";
import Dashboard from 'components/pages/Dashboard'

const MyRecipes = () => {
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <Dashboard authorId={currentUser.id}/>
  )
}

export default MyRecipes