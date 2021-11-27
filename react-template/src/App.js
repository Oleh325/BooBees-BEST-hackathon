import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Drawroom from "./Drawroom";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="drawroom" element={<Drawroom />} />
          </Routes>
      </BrowserRouter>
  );
}

function Home() {
    return (
        <div>
        <h2>Home</h2>
        <Link to="drawroom">Go to drawroom</Link>
        </div>
    );
}

export default App;
