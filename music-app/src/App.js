import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage';
import Playlists from './components/Playlists';

function App() {
  return (
    <Router>
        <Routes>
        <Route exact path="/" children={<Homepage />} />
        <Route exact path="/playlists" children={<Playlists />} />
        </Routes>
    </Router>
    
  );
}

export default App;
