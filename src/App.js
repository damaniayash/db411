import './App.scss';
import { BrowserRouter } from 'react-router-dom';
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
