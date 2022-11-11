import React from "react";

import {Routes, Route} from "react-router-dom";
import AgentView from "../Components/Agent/AgentView";


function AgentRouter (){
  return  (
        <Routes>
            <Route path="/agent" element={<AgentView />} />
        </Routes>
  )
 
}

export default AgentRouter;
