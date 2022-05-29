import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import SearchInfo from './pages/SearchInfo';
import MapBike from './pages/MapBike';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
          <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/searchbike" element={<SearchInfo />} />
          <Route exact path="/mapbike" element={<MapBike />} />
        </Routes>

      
    </Router>
    </div>
  );
}

export default App;
