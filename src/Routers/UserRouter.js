import React from "react";

import {Routes, Route} from "react-router-dom";
import Login from "../Components/Auth/Login";
import UserView from "../Components/User/UserView";


function UserRouter (){
  return  (
        <Routes>
            <Route path="/user" element={<UserView />} />
            <Route path="/login" element={<Login />} />
        </Routes>
  )
 
}

export default UserRouter;
