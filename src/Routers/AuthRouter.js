import React from "react";

import {Routes, Route} from "react-router-dom";

import Login from "../Components/Auth/Login";

import { useNavigation } from "react-router-dom";

function AuthRouter (){

  return  (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
  )
 
}

export default AuthRouter;
