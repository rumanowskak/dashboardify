import './App.css';
import { Route,Routes } from "react-router-dom"
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  return (
    <div className="app" >
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>

      </Routes>
    </div>
  );
}

export default App;
