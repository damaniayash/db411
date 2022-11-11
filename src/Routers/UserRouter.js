import React from "react";

import {Routes, Route} from "react-router-dom";
import UserView from "../Components/User/UserView";


function UserRouter (){
  return  (
        <Routes>
            <Route path="/user" element={<UserView />} />
        </Routes>
  )
 
}

export default UserRouter;
