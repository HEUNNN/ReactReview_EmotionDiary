import Home from "./Pages/Home";
import New from "./Pages/New";
import Edit from "./Pages/Edit";
import Diary from "./Pages/Diary";
// Routing 할 페이지
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RouteTest from "./components/RouteTest";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>Emotion Diary </h2>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* url이 http://localhost:3000/ -> index라는 뜻 */}
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
        <h2>Link component test</h2>
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
