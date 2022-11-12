import './App.css';
import { BrowserRouter, Link } from 'react-router-dom';
import {Routes, Route} from "react-router-dom";
import AgentView from './Components/Agent/AgentView';
import UserView from './Components/User/UserView';
import AgentRouter from './Routers/AgentRouter';
import UserRouter from './Routers/UserRouter';


function App() {

  
  return (
    <div className="App">
      
      <BrowserRouter>

        <AgentRouter />
        <UserRouter />
        
      </BrowserRouter>

      
    </div>
  );
}

export default App;
