import './App.scss';
import { BrowserRouter, Link } from 'react-router-dom';
import {Routes, Route} from "react-router-dom";
import AgentView from './Components/Agent/AgentView';
import UserView from './Components/User/UserView';
import AgentRouter from './Routers/AgentRouter';
import UserRouter from './Routers/UserRouter';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';

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
