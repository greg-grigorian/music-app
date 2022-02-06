import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import Playlists from './components/Playlists';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="home" element={<HomePage />} />
      <Route exact path="play" element={<Playlists />} />
      </Routes>
    </Router>
  );
}

export default App;
