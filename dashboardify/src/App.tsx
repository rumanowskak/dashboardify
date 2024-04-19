import './App.css';
import { Route,Routes } from "react-router-dom"
import LandingPage from './components/LandingPage/LandingPage';


function App() {
  return (
    <div className="app" >
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
