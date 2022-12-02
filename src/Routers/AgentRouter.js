import React from "react";

import {Routes, Route} from "react-router-dom";
import AgentView from "../Components/Agent/AgentView";
import AgentViewWrapper from "../Components/Agent/AgentViewWrapper";


function AgentRouter (){
  return  (
        <Routes>
            <Route path="/agent/:id" element={<AgentViewWrapper />} />
        </Routes>
  )
 
}

export default AgentRouter;
