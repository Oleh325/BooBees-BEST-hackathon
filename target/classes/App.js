import './App.css';
import './Home.css';

import Home from "./Home";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Drawroom from "./Drawroom";
import Lobby from "./Lobby";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="drawroom" element={<Drawroom />} />
              <Route path="lobby" element={<Lobby />} />

          </Routes>
      </BrowserRouter>
  );
}


export default App;
